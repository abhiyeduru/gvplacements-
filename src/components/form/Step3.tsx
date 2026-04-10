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
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Terms & Conditions</h2>
              <button
                style={styles.closeBtn}
                onClick={() => setShowTermsModal(false)}
              >
                ✕
              </button>
            </div>
            <div style={styles.modalContent}>
              <p><strong>1. Payment & Registration Fee</strong></p>
              <p>By clicking "Pay", you authorize Gravity Job Placement to charge the specified amount. This is a one-time, non-refundable registration fee.</p>
              
              <p><strong>2. Service Description</strong></p>
              <p>Gravity Job Placement provides job placement assistance including profile review, interview scheduling, career coaching, and employer connections for 12 months.</p>
              
              <p><strong>3. No Placement Guarantee</strong></p>
              <p>Gravity Job Placement does NOT guarantee employment. Placement depends on your qualifications, interview performance, employer requirements, and market conditions.</p>
              
              <p><strong>4. Non-Refundable Fee</strong></p>
              <p>The registration fee is FINAL and NON-REFUNDABLE. No refunds will be issued after payment is processed.</p>
              
              <p><strong>5. Success Commission</strong></p>
              <p>After successful placement: 50% of 1st salary, 25% of 2nd salary, 25% of 3rd salary.</p>
              
              <p><strong>6. Document Authenticity</strong></p>
              <p>You confirm all documents submitted are authentic and valid. Submitting false documents will result in immediate cancellation without refund.</p>
              
              <p><strong>7. Data Privacy & Security</strong></p>
              <p>Your personal information is stored securely and used only for job placement purposes. Your data will not be shared with third parties without consent.</p>
              
              <p><strong>8. Payment Security</strong></p>
              <p>Payments are processed securely through Razorpay (PCI-DSS compliant). Your payment information is encrypted and protected.</p>
              
              <p><strong>9. Candidate Responsibilities</strong></p>
              <p>You agree to attend all scheduled interviews, maintain professional conduct, respond to communications within 24 hours, and provide accurate information.</p>
              
              <p><strong>10. Limitation of Liability</strong></p>
              <p>Gravity Job Placement is not liable for failure to secure employment, job loss after placement, or any indirect damages.</p>
              
              <p><strong>11. Dispute Resolution</strong></p>
              <p>Any disputes will be resolved through direct communication, mediation, or arbitration under Indian law. Jurisdiction: Hyderabad, India.</p>
              
              <p><strong>12. Acknowledgment</strong></p>
              <p>By checking the box and clicking "Pay", you acknowledge that you have read, understood, and agree to all terms and conditions.</p>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.closeModalBtn}
                onClick={() => setShowTermsModal(false)}
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
  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: theme.colors.bg2,
    borderRadius: '12px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    display: 'flex' as const,
    flexDirection: 'column' as const,
  },
  modalHeader: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: `1px solid ${theme.colors.border}`,
    position: 'sticky' as const,
    top: 0,
    background: theme.colors.bg2,
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.colors.text,
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme.colors.text2,
  },
  modalContent: {
    padding: '20px',
    flex: 1,
    overflow: 'auto',
    fontSize: '14px',
    color: theme.colors.text2,
    lineHeight: '1.8',
  },
  modalFooter: {
    padding: '20px',
    borderTop: `1px solid ${theme.colors.border}`,
    display: 'flex' as const,
    justifyContent: 'center',
    position: 'sticky' as const,
    bottom: 0,
    background: theme.colors.bg2,
  },
  closeModalBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
};
