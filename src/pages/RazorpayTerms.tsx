import { theme } from '../styles/theme';

interface RazorpayTermsProps {
  onClose: () => void;
}

export default function RazorpayTerms({ onClose }: RazorpayTermsProps) {
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Razorpay Payment Terms & Conditions</h2>
          <button
            type="button"
            onClick={onClose}
            style={styles.closeBtn}
          >
            ✕
          </button>
        </div>

        <div style={styles.modalBody}>
          <h3 style={styles.sectionTitle}>1. Payment & Registration Fee</h3>
          <p style={styles.sectionText}>
            By clicking "Pay", you authorize Gravity Job Placement to charge the specified amount to your payment method via Razorpay. This is a one-time, non-refundable registration fee that covers job placement assistance services.
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
            The registration fee is FINAL and NON-REFUNDABLE. No refunds will be issued after payment is processed, except within 24 hours of registration if requested in writing.
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
            onClick={onClose}
            style={styles.closeModalBtn}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
    padding: '20px',
  },
  modalContent: {
    background: '#ffffff',
    borderRadius: '12px',
    maxWidth: '700px',
    width: '100%',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: `1px solid ${theme.colors.border}`,
    position: 'sticky' as const,
    top: 0,
    background: '#ffffff',
    zIndex: 10,
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
    fontFamily: 'Poppins, sans-serif',
  },
  modalFooter: {
    padding: '16px 24px',
    borderTop: `1px solid ${theme.colors.border}`,
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'sticky' as const,
    bottom: 0,
    background: '#ffffff',
    zIndex: 10,
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
};
