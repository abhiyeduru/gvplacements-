import { useState } from 'react';
import { theme } from '../../styles/theme';
import RazorpayTerms from '../../pages/RazorpayTerms';

interface Step3Props {
  data: any;
  paymentAmount?: number;
  onPrev: () => void;
  onPayment: (termsAccepted: boolean) => void;
}

export default function Step3({ data, paymentAmount = 1, onPrev, onPayment }: Step3Props) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handlePayment = () => {
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    onPayment(termsAccepted);
  };

  return (
    <div>
      <div style={styles.stepIndicator}>Step <span style={{ color: theme.colors.gold, fontWeight: 600 }}>3</span> of 3</div>

      <div style={styles.reviewGrid}>
        <ReviewItem label="Full Name" value={data.name} />
        <ReviewItem label="Father's Name" value={data.fatherName} />
        <ReviewItem label="Phone" value={data.phone} />
        <ReviewItem label="Email" value={data.email} />
        <ReviewItem label="PAN" value={data.pan} />
        <ReviewItem label="Aadhar" value={data.aadhar} />
        <ReviewItem label="Date of Birth" value={data.dob} />
        <ReviewItem label="Gender" value={data.gender} />
        <ReviewItem label="Qualification" value={data.qualification} />
        <ReviewItem label="Experience" value={data.experience} />
        <ReviewItem label="Position" value={data.position} full />
        <ReviewItem label="Current Address" value={data.currentAddress} full />
        {data.permanentAddress && (
          <ReviewItem label="Permanent Address" value={data.permanentAddress} full />
        )}
      </div>

      <div style={styles.paymentSummary}>
        <div style={styles.psRow}>
          <span>Registration Fee</span>
          <span>₹{paymentAmount.toLocaleString()}</span>
        </div>
        <div style={styles.psRow}>
          <span>Processing (included)</span>
          <span>₹0</span>
        </div>
        <div style={styles.psTotal}>
          <span>Total Payable</span>
          <span>₹{paymentAmount.toLocaleString()}</span>
        </div>
      </div>

      <label style={styles.termsCheck}>
        <div style={{
          ...styles.checkboxContainer,
          backgroundColor: termsAccepted ? '#3b82f6' : '#ffffff',
          borderColor: termsAccepted ? '#3b82f6' : '#d1d5db',
        }}>
          {termsAccepted && (
            <span style={styles.checkmark}>✓</span>
          )}
        </div>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          style={styles.checkbox}
        />
        <div style={styles.termsTextContainer}>
          <span style={styles.termsLabel}>
            I agree to the{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowTermsModal(true);
              }}
              style={styles.termsLink}
            >
              Terms & Conditions
            </button>
            . I understand the ₹{paymentAmount.toLocaleString()} fee is non-refundable and placement is not guaranteed.
          </span>
        </div>
      </label>

      {showTermsModal && (
        <RazorpayTerms onClose={() => setShowTermsModal(false)} />
      )}

      <div style={styles.formNav}>
        <button style={styles.btnBack} onClick={onPrev}>← Back</button>
        <button 
          style={termsAccepted ? styles.btnNext : styles.btnNextDisabled}
          onClick={handlePayment}
          disabled={!termsAccepted}
        >
          Pay ₹{paymentAmount.toLocaleString()} via Razorpay 🔒
        </button>
      </div>
    </div>
  );
}

function ReviewItem({ label, value, full }: any) {
  return (
    <div style={{ ...styles.reviewItem, ...(full && { gridColumn: '1 / -1' }) }}>
      <div style={styles.rvLabel}>{label}</div>
      <div style={styles.rvVal}>{value || '—'}</div>
    </div>
  );
}

const styles = {
  stepIndicator: {
    fontSize: '13px',
    color: theme.colors.text3,
    marginBottom: '20px',
  },
  reviewGrid: {
    display: 'grid' as const,
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '20px',
  },
  reviewItem: {
    background: theme.colors.bg3,
    borderRadius: '8px',
    padding: '12px 14px',
  },
  rvLabel: {
    fontSize: '11px',
    color: theme.colors.text3,
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  rvVal: {
    fontSize: '14px',
    color: theme.colors.text,
    fontWeight: 500,
    wordBreak: 'break-word' as const,
  },
  paymentSummary: {
    background: theme.colors.goldDim,
    border: `1px solid ${theme.colors.goldBorder}`,
    borderRadius: theme.radius,
    padding: '18px 20px',
    marginBottom: '20px',
  },
  psRow: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    fontSize: '14px',
    color: theme.colors.text2,
    padding: '4px 0',
  },
  psTotal: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    borderTop: `1px solid ${theme.colors.goldBorder}`,
    marginTop: '10px',
    paddingTop: '10px',
    fontWeight: 700,
    fontSize: '18px',
    color: theme.colors.gold,
  },
  termsCheck: {
    display: 'flex' as const,
    alignItems: 'flex-start' as const,
    gap: '12px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  checkboxContainer: {
    width: '24px',
    height: '24px',
    minWidth: '24px',
    borderRadius: '6px',
    border: '2px solid #d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    transition: 'all 0.2s ease',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  checkbox: {
    display: 'none',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsLabel: {
    fontSize: '14px',
    color: theme.colors.text2,
    lineHeight: '1.6',
  },
  termsLink: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    padding: '0',
    margin: '0 2px',
  },
  formNav: {
    display: 'flex' as const,
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: `1px solid ${theme.colors.border}`,
  },
  btnBack: {
    background: 'transparent',
    border: `1px solid ${theme.colors.border2}`,
    color: theme.colors.text2,
    borderRadius: theme.radius,
    padding: '12px 24px',
    fontSize: '15px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  btnNext: {
    background: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    transition: 'all 0.3s ease',
  },
  btnNextDisabled: {
    background: '#d1d5db',
    color: '#9ca3af',
    border: 'none',
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'not-allowed',
    fontFamily: 'Poppins, sans-serif',
    opacity: 0.6,
  },
};
