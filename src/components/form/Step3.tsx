import { useState } from 'react';
import { theme } from '../../styles/theme';

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
        <div style={styles.modalOverlay} onClick={() => setShowTermsModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Terms & Conditions</h2>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalBody}>
              <h3 style={styles.sectionTitle}>1. Registration Fee</h3>
              <p style={styles.sectionText}>
                The registration fee of ₹{paymentAmount.toLocaleString()} is non-refundable. This fee covers the cost of processing your application and providing job placement assistance.
              </p>

              <h3 style={styles.sectionTitle}>2. Placement Guarantee</h3>
              <p style={styles.sectionText}>
                Gravity Job Placement Platform does not guarantee placement. We provide job assistance and training, but actual placement depends on your qualifications, performance, and market conditions.
              </p>

              <h3 style={styles.sectionTitle}>3. Data Privacy</h3>
              <p style={styles.sectionText}>
                Your personal information will be kept confidential and used only for job placement purposes. We will not share your data with third parties without your consent.
              </p>

              <h3 style={styles.sectionTitle}>4. Document Verification</h3>
              <p style={styles.sectionText}>
                All documents submitted must be authentic and valid. False or forged documents will result in immediate cancellation of your registration without refund.
              </p>

              <h3 style={styles.sectionTitle}>5. Code of Conduct</h3>
              <p style={styles.sectionText}>
                Candidates must maintain professional conduct during all interactions with our team and potential employers. Any misconduct may result in removal from the program.
              </p>

              <h3 style={styles.sectionTitle}>6. Liability</h3>
              <p style={styles.sectionText}>
                Gravity Job Placement Platform is not liable for any direct or indirect damages resulting from the use of our services or failure to secure employment.
              </p>

              <h3 style={styles.sectionTitle}>7. Modifications</h3>
              <p style={styles.sectionText}>
                We reserve the right to modify these terms and conditions at any time. Continued use of our services constitutes acceptance of any changes.
              </p>
            </div>
            <div style={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                style={styles.closeModalBtn}
              >
                Close
              </button>
            </div>
          </div>
        </div>
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
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#ffffff',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: theme.colors.text,
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: theme.colors.text3,
    cursor: 'pointer',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '24px',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: theme.colors.text,
    marginTop: '16px',
    marginBottom: '8px',
    fontFamily: 'Poppins, sans-serif',
  },
  sectionText: {
    fontSize: '14px',
    color: theme.colors.text2,
    lineHeight: '1.6',
    margin: '0 0 12px 0',
  },
  modalFooter: {
    padding: '16px 24px',
    borderTop: `1px solid ${theme.colors.border}`,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  closeModalBtn: {
    background: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: theme.radius,
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
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
