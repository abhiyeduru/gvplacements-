import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';
import SuccessScreen from '../components/SuccessScreen';
import { saveCandidateProfile } from '../services/candidateService';
import { CandidateData } from '../types';

export default function PaymentReturn() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState('');
  const [successCandidate, setSuccessCandidate] = useState<CandidateData | null>(null);

  useEffect(() => {
    const handlePaymentReturn = async () => {
      try {
        // Get candidate data from URL params or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const candidateParam = urlParams.get('candidate');
        
        let candidateData: CandidateData | null = null;

        if (candidateParam) {
          try {
            candidateData = JSON.parse(decodeURIComponent(candidateParam));
          } catch (e) {
            console.error('Error parsing candidate from URL:', e);
          }
        }

        // Fallback to localStorage
        if (!candidateData) {
          const candidateDataStr = localStorage.getItem('pendingCandidateData');
          if (candidateDataStr) {
            candidateData = JSON.parse(candidateDataStr);
          }
        }

        if (!candidateData) {
          setError('No pending registration found. Please start over.');
          setLoading(false);
          return;
        }

        console.log('💾 Processing payment return for:', candidateData.name);

        // Mark payment as successful
        candidateData.paymentStatus = 'success';
        candidateData.paymentId = 'pay_' + Date.now();
        candidateData.paymentDate = new Date().toISOString();

        console.log('💾 Saving candidate profile after payment...');
        const docId = await saveCandidateProfile(candidateData);
        
        console.log('✓ Profile saved with ID:', docId);
        setSuccessId(docId);
        setSuccessCandidate(candidateData);
        setSuccess(true);
        
        // Clear storage
        localStorage.removeItem('pendingCandidateData');
        sessionStorage.removeItem('pendingCandidateData');
        
        setLoading(false);
      } catch (err) {
        console.error('❌ Error processing payment return:', err);
        setError('Error processing your registration. Please contact support.');
        setLoading(false);
      }
    };

    handlePaymentReturn();
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <div style={styles.spinner} />
          <p>Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (success && successCandidate) {
    return <SuccessScreen id={successId} candidate={successCandidate} onClose={() => window.location.href = '/'} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.errorBox}>
        <div style={styles.errorIcon}>⚠️</div>
        <h2 style={styles.errorTitle}>Payment Processing Error</h2>
        <p style={styles.errorMessage}>{error}</p>
        <div style={styles.actions}>
          <button 
            style={styles.retryBtn}
            onClick={() => window.location.href = '/'}
          >
            ← Back to Home
          </button>
          <button 
            style={styles.contactBtn}
            onClick={() => window.location.href = '/contact'}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: theme.colors.bg,
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  loader: {
    textAlign: 'center' as const,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: `4px solid ${theme.colors.border2}`,
    borderTopColor: theme.colors.gold,
    animation: 'spin 0.8s linear infinite',
  },
  errorBox: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '500px',
    textAlign: 'center' as const,
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: theme.colors.text,
    margin: '0 0 12px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  errorMessage: {
    fontSize: '15px',
    color: theme.colors.text2,
    margin: '0 0 24px 0',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex' as const,
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  retryBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  contactBtn: {
    background: 'transparent',
    color: theme.colors.gold,
    border: `1px solid ${theme.colors.gold}`,
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
};
