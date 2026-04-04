import { useState, useEffect } from 'react';
import { CandidateData } from '../types';
import Step1 from './form/Step1';
import Step2 from './form/Step2';
import Step3 from './form/Step3';
import SuccessScreen from './SuccessScreen';
import { uploadFileToCloudinary } from '../services/cloudinaryService';
import { saveCandidateProfile } from '../services/candidateService';
import { initiateRazorpayPayment } from '../services/paymentService';
import { paymentSettingsService } from '../services/paymentSettingsService';
import { theme } from '../styles/theme';

interface RegistrationFormProps {
  onClose: () => void;
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successId, setSuccessId] = useState('');
  const [successCandidate, setSuccessCandidate] = useState<CandidateData | null>(null);
  const [error, setError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(1);
  const [formData, setFormData] = useState<Partial<CandidateData>>({
    paymentStatus: 'pending',
    paymentAmount: 1,
    status: 'registered',
  });
  const [files, setFiles] = useState<{ resume?: File; pan?: File }>({});

  // Load payment amount from settings when form opens
  useEffect(() => {
    const loadPaymentAmount = async () => {
      try {
        const amount = await paymentSettingsService.getSelectedAmount();
        console.log('💰 Loaded payment amount from settings:', amount);
        setPaymentAmount(amount);
        setFormData(prev => ({ ...prev, paymentAmount: amount }));
      } catch (error) {
        console.error('Error loading payment amount:', error);
        // Keep default amount if error
      }
    };
    loadPaymentAmount();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleFileChange = (type: 'resume' | 'pan', file: File | null) => {
    setFiles(prev => ({ ...prev, [type]: file || undefined }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handlePayment = async (termsAccepted: boolean) => {
    setLoading(true);
    setError('');
    try {
      // Upload files to Cloudinary
      let resumeUrl, panUrl;
      if (files.resume) {
        console.log('📤 Uploading resume to Cloudinary...');
        resumeUrl = await uploadFileToCloudinary(files.resume, 'resumes');
      }
      if (files.pan) {
        console.log('📤 Uploading PAN to Cloudinary...');
        panUrl = await uploadFileToCloudinary(files.pan, 'pan');
      }

      const candidateData: CandidateData = {
        ...formData as CandidateData,
        resumeUrl,
        panUrl,
        termsAccepted,
        createdAt: new Date().toISOString(),
        paymentDate: new Date().toISOString(),
      };

      console.log('💳 Initiating payment with data:', candidateData);

      await initiateRazorpayPayment(
        candidateData,
        async (response) => {
          try {
            candidateData.paymentId = response.razorpay_payment_id;
            candidateData.paymentStatus = 'success';
            
            console.log('✓ Payment successful, saving profile...');
            const docId = await saveCandidateProfile(candidateData);
            setSuccessId(docId);
            setSuccessCandidate(candidateData);
            setSuccess(true);
            setLoading(false);
          } catch (err) {
            console.error('❌ Error saving profile:', err);
            setError('Profile saved but error in confirmation. Contact support.');
            setLoading(false);
          }
        },
        (error) => {
          console.error('❌ Payment error:', error);
          setError(`Payment error: ${error}`);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error('❌ Error:', error);
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  if (success && successCandidate) {
    return <SuccessScreen id={successId} candidate={successCandidate} onClose={onClose} />;
  }

  return (
    <div style={styles.container}>
      {loading && <Loader />}
      {error && <ErrorBanner message={error} onClose={() => setError('')} />}
      
      <div style={styles.header}>
        <h2>Candidate Registration</h2>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div style={styles.body}>
        <ProgressBar currentStep={currentStep} />
        
        {currentStep === 1 && (
          <Step1 
            data={formData} 
            onChange={handleInputChange}
            onNext={handleNextStep}
          />
        )}
        
        {currentStep === 2 && (
          <Step2 
            data={formData}
            files={files}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            onNext={handleNextStep}
            onPrev={handlePrevStep}
          />
        )}
        
        {currentStep === 3 && (
          <Step3 
            data={formData}
            paymentAmount={paymentAmount}
            onPrev={handlePrevStep}
            onPayment={handlePayment}
          />
        )}
      </div>
    </div>
  );
}

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div style={styles.progress}>
      {[1, 2, 3].map(step => (
        <div
          key={step}
          style={{
            ...styles.progressStep,
            background: step <= currentStep ? theme.colors.gold : theme.colors.border2,
          }}
        />
      ))}
    </div>
  );
}

function Loader() {
  return (
    <div style={styles.loader}>
      <div style={styles.spinner} />
      <p>Processing...</p>
    </div>
  );
}

function ErrorBanner({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div style={styles.errorBanner}>
      <span>{message}</span>
      <button onClick={onClose} style={styles.errorClose}>✕</button>
    </div>
  );
}

const styles = {
  container: {
    background: theme.colors.bg2,
    borderRadius: theme.radiusLg,
    maxWidth: '640px',
    maxHeight: '90vh',
    overflow: 'auto' as const,
  },
  header: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '24px 28px',
    borderBottom: `1px solid ${theme.colors.border}`,
    position: 'sticky' as const,
    top: 0,
    background: theme.colors.bg2,
    zIndex: 1,
  },
  closeBtn: {
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.text2,
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: '28px',
  },
  progress: {
    display: 'flex' as const,
    gap: '8px',
    marginBottom: '32px',
  },
  progressStep: {
    flex: 1,
    height: '3px',
    borderRadius: '2px',
    transition: 'background 0.3s',
  },
  loader: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    zIndex: 300,
  },
  spinner: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: `3px solid ${theme.colors.border2}`,
    borderTopColor: theme.colors.gold,
    animation: 'spin 0.8s linear infinite',
  },
  errorBanner: {
    position: 'fixed' as const,
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: theme.colors.red,
    color: 'white',
    padding: '12px 20px',
    borderRadius: theme.radius,
    display: 'flex' as const,
    alignItems: 'center',
    gap: '10px',
    zIndex: 400,
    maxWidth: '90%',
  },
  errorClose: {
    background: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
