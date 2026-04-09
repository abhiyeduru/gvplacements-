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
              <h3 style={styles.sectionTitle}>1. Payment & Registration Fee</h3>
              <p style={styles.sectionText}>
                By clicking "Pay", you authorize Gravity Job Placement to charge ₹{paymentAmount.toLocaleString()} to your payment method via Razorpay. This is a one-time, non-refundable registration fee that covers job placement assistance services.
              </p>

              <h3 style={styles.sectionTitle}>2. Service Description</h3>
              <p style={styles.sectionText}>
                Gravity Job Placement provides job placement assistance including: profile review, interview scheduling, career coaching, and employer connections. Services are provided for 12 months from registration date.
              </p>

              <h3 style={styles.sectionTitle}>3. No Placement Guarantee</h3>
              <p style={styles.sectionText}>
                Gravity Job Placement does NOT guarantee employment or placement. Actual placement depends on your qualifications, interview performance, employer requirements, and market conditions. We provide assistance only.
              </p>

              <h3 style={styles.sectionTitle}>4. Non-Refundable Fee</h3>
              <p style={styles.sectionText}>
                The registration fee of ₹{paymentAmount.toLocaleString()} is FINAL and NON-REFUNDABLE. No refunds will be issued after payment is processed, except within 24 hours of registration if requested in writing.
              </p>

              <h3 style={styles.sectionTitle}>5. Success Commission</h3>
              <p style={styles.sectionText}>
                After successful placement, Gravity Job Placement charges success commission: 50% of 1st salary, 25% of 2nd salary, 25% of 3rd salary. This is deducted from your salary by the employer.
              </p>

              <h3 style={styles.sectionTitle}>6. Document Authenticity</h3>
              <p style={styles.sectionText}>
                You confirm that all documents submitted (resume, PAN, Aadhar, etc.) are authentic and valid. Submitting false or forged documents will result in immediate cancellation without refund and legal action.
              </p>

              <h3 style={styles.sectionTitle}>7. Data Privacy & Security</h3>
              <p style={styles.sectionText}>
                Your personal information is stored securely and used only for job placement purposes. We comply with data protection laws. Your data will not be shared with third parties without consent.
              </p>

              <h3 style={styles.sectionTitle}>8. Payment Security</h3>
              <p style={styles.sectionText}>
                Payments are processed securely through Razorpay (PCI-DSS compliant). Your payment information is encrypted and protected. Gravity Job Placement does not store your payment details.
              </p>

              <h3 style={styles.sectionTitle}>9. Candidate Responsibilities</h3>
              <p style={styles.sectionText}>
                You agree to: attend all scheduled interviews, maintain professional conduct, respond to communications within 24 hours, and provide accurate information. Failure to comply may result in service termination.
              </p>

              <h3 style={styles.sectionTitle}>10. Limitation of Liability</h3>
              <p style={styles.sectionText}>
                Gravity Job Placement is not liable for: failure to secure employment, job loss after placement, salary disputes, or any indirect damages. Our liability is limited to the registration fee paid.
              </p>

              <h3 style={styles.sectionTitle}>11. Dispute Resolution</h3>
              <p style={styles.sectionText}>
                Any disputes will be resolved through: (1) Direct communication with support, (2) Mediation, (3) Arbitration under Indian law. Jurisdiction: Hyderabad, India.
              </p>

              <h3 style={styles.sectionTitle}>12. Terms Modification</h3>
              <p style={styles.sectionText}>
                Gravity Job Placement reserves the right to modify these terms at any time. Continued use of services constitutes acceptance of changes. You will be notified of major changes via email.
              </p>

              <h3 style={styles.sectionTitle}>13. Acknowledgment</h3>
              <p style={styles.sectionText}>
                By checking the box and clicking "Pay", you acknowledge that you have read, understood, and agree to all terms and conditions. You also confirm that you are 18+ years old and legally authorized to make this payment.
              </p>

              <h3 style={styles.sectionTitle}>14. Contact Information</h3>
              <p style={styles.sectionText}>
                For questions or disputes: Email: support@gvplacements.com | Phone: +91-XXXXXXXXXX | Website: https://www.gvplacements.com | Address: Hyderabad, India
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
