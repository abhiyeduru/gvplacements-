import { useState } from 'react';
import { theme } from '../styles/theme';
import { testDatabaseConnection, addTestCandidate, verifyAllCandidates } from '../services/testDatabase';

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);

  const handleTestConnection = async () => {
    setLoading(true);
    const result = await testDatabaseConnection();
    setResults(result);
    setLoading(false);
  };

  const handleAddTestData = async () => {
    setLoading(true);
    const result = await addTestCandidate();
    setResults(result);
    setLoading(false);
  };

  const handleVerifyData = async () => {
    setLoading(true);
    const result = await verifyAllCandidates();
    setResults(result);
    if (result.success && result.candidates) {
      setCandidates(result.candidates);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Database Test Page</h1>
        <p style={styles.subtitle}>Test Firebase connectivity and data storage</p>
      </div>

      <div style={styles.buttons}>
        <button
          onClick={handleTestConnection}
          disabled={loading}
          style={{ ...styles.btn, ...styles.btnPrimary }}
        >
          {loading ? 'Testing...' : '🔌 Test Connection'}
        </button>
        <button
          onClick={handleAddTestData}
          disabled={loading}
          style={{ ...styles.btn, ...styles.btnSuccess }}
        >
          {loading ? 'Adding...' : '➕ Add Test Data'}
        </button>
        <button
          onClick={handleVerifyData}
          disabled={loading}
          style={{ ...styles.btn, ...styles.btnInfo }}
        >
          {loading ? 'Verifying...' : '✓ Verify All Data'}
        </button>
      </div>

      {results && (
        <div style={{
          ...styles.results,
          background: results.success ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
          borderColor: results.success ? '#22c55e' : '#ef4444',
        }}>
          <h3 style={{
            color: results.success ? '#22c55e' : '#ef4444',
            margin: '0 0 12px 0',
          }}>
            {results.success ? '✓ Success' : '✗ Error'}
          </h3>
          <p style={styles.message}>{results.message}</p>
          {results.docId && (
            <p style={styles.detail}>Document ID: <code>{results.docId}</code></p>
          )}
          {results.candidateCount !== undefined && (
            <p style={styles.detail}>Total Candidates: <strong>{results.candidateCount}</strong></p>
          )}
        </div>
      )}

      {candidates.length > 0 && (
        <div style={styles.candidatesSection}>
          <h2 style={styles.sectionTitle}>Candidates in Database ({candidates.length})</h2>
          <div style={styles.candidatesList}>
            {candidates.map((candidate, index) => (
              <div key={candidate.id} style={styles.candidateCard}>
                <div style={styles.candidateHeader}>
                  <span style={styles.candidateIndex}>{index + 1}</span>
                  <h4 style={styles.candidateName}>{candidate.name}</h4>
                  <span style={{
                    ...styles.badge,
                    background: candidate.paymentStatus === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                    color: candidate.paymentStatus === 'success' ? '#22c55e' : '#ef4444',
                  }}>
                    {candidate.paymentStatus}
                  </span>
                </div>
                <div style={styles.candidateDetails}>
                  <p><strong>Email:</strong> {candidate.email}</p>
                  <p><strong>Phone:</strong> {candidate.phone}</p>
                  <p><strong>Position:</strong> {candidate.position}</p>
                  <p><strong>Status:</strong> {candidate.status}</p>
                  <p><strong>ID:</strong> <code style={styles.code}>{candidate.id}</code></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={styles.footer}>
        <p>This page is for testing purposes only.</p>
        <p>Access: http://localhost:3000/test</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: theme.colors.bg,
    color: theme.colors.text,
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: "'DM Sans', sans-serif",
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '32px',
    fontWeight: 800,
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: theme.colors.text2,
    margin: 0,
  },
  buttons: {
    display: 'flex' as const,
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap' as const,
  },
  btn: {
    border: 'none',
    borderRadius: theme.radius,
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    transition: 'all 0.2s',
  },
  btnPrimary: {
    background: theme.colors.gold,
    color: '#0a0a0f',
  },
  btnSuccess: {
    background: '#22c55e',
    color: 'white',
  },
  btnInfo: {
    background: '#3b82f6',
    color: 'white',
  },
  results: {
    background: 'rgba(34,197,94,0.15)',
    border: `1px solid #22c55e`,
    borderRadius: theme.radiusLg,
    padding: '24px',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  message: {
    fontSize: '15px',
    margin: '0 0 12px 0',
    lineHeight: '1.6',
  },
  detail: {
    fontSize: '14px',
    color: theme.colors.text2,
    margin: '8px 0',
  },
  code: {
    background: theme.colors.bg3,
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  candidatesSection: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '20px',
    color: theme.colors.gold,
  },
  candidatesList: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  candidateCard: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: '16px',
  },
  candidateHeader: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    paddingBottom: '12px',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  candidateIndex: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '12px',
  },
  candidateName: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    flex: 1,
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
  },
  candidateDetails: {
    fontSize: '13px',
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '60px',
    color: theme.colors.text3,
    fontSize: '13px',
  },
};
