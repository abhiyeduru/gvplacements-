import { theme } from '../styles/theme';

export default function TermsAndConditions() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.subtitle}>Please read these terms carefully before using our services</p>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Payment & Registration Fee</h2>
          <p style={styles.text}>
            By clicking "Pay", you authorize Gravity Job Placement to charge the specified amount to your payment method via Razorpay. This is a one-time, non-refundable registration fee that covers job placement assistance services.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Service Description</h2>
          <p style={styles.text}>
            Gravity Job Placement provides job placement assistance including: profile review, interview scheduling, career coaching, and employer connections. Services are provided for 12 months from registration date.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. No Placement Guarantee</h2>
          <p style={styles.text}>
            Gravity Job Placement does NOT guarantee employment or placement. Actual placement depends on your qualifications, interview performance, employer requirements, and market conditions. We provide assistance only.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Non-Refundable Fee</h2>
          <p style={styles.text}>
            The registration fee is FINAL and NON-REFUNDABLE. No refunds will be issued after payment is processed, except within 24 hours of registration if requested in writing.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Success Commission</h2>
          <p style={styles.text}>
            After successful placement, Gravity Job Placement charges success commission: 50% of 1st salary, 25% of 2nd salary, 25% of 3rd salary. This is deducted from your salary by the employer.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Document Authenticity</h2>
          <p style={styles.text}>
            You confirm that all documents submitted (resume, PAN, Aadhar, etc.) are authentic and valid. Submitting false or forged documents will result in immediate cancellation without refund and legal action.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Data Privacy & Security</h2>
          <p style={styles.text}>
            Your personal information is stored securely and used only for job placement purposes. We comply with data protection laws. Your data will not be shared with third parties without consent.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Payment Security</h2>
          <p style={styles.text}>
            Payments are processed securely through Razorpay (PCI-DSS compliant). Your payment information is encrypted and protected. Gravity Job Placement does not store your payment details.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Candidate Responsibilities</h2>
          <p style={styles.text}>
            You agree to: attend all scheduled interviews, maintain professional conduct, respond to communications within 24 hours, and provide accurate information. Failure to comply may result in service termination.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10. Limitation of Liability</h2>
          <p style={styles.text}>
            Gravity Job Placement is not liable for: failure to secure employment, job loss after placement, salary disputes, or any indirect damages. Our liability is limited to the registration fee paid.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>11. Dispute Resolution</h2>
          <p style={styles.text}>
            Any disputes will be resolved through: (1) Direct communication with support, (2) Mediation, (3) Arbitration under Indian law. Jurisdiction: Hyderabad, India.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>12. Terms Modification</h2>
          <p style={styles.text}>
            Gravity Job Placement reserves the right to modify these terms at any time. Continued use of services constitutes acceptance of changes. You will be notified of major changes via email.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>13. Acknowledgment</h2>
          <p style={styles.text}>
            By checking the box and clicking "Pay", you acknowledge that you have read, understood, and agree to all terms and conditions. You also confirm that you are 18+ years old and legally authorized to make this payment.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>14. Contact Information</h2>
          <p style={styles.text}>
            For questions or disputes: Email: support@gvplacements.com | Phone: +91-XXXXXXXXXX | Website: https://www.gvplacements.com | Address: Hyderabad, India
          </p>
        </section>
      </div>

      <div style={styles.footer}>
        <a href="/" style={styles.backLink}>← Back to Home</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: theme.colors.bg,
    padding: '40px 20px',
  },
  header: {
    maxWidth: '900px',
    margin: '0 auto 40px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    color: theme.colors.text,
    margin: '0 0 12px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  subtitle: {
    fontSize: '16px',
    color: theme.colors.text2,
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto 40px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: '12px',
    fontFamily: 'Poppins, sans-serif',
  },
  text: {
    fontSize: '15px',
    color: theme.colors.text2,
    lineHeight: '1.8',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  footer: {
    maxWidth: '900px',
    margin: '40px auto 0',
    paddingTop: '20px',
    borderTop: `1px solid ${theme.colors.border}`,
    textAlign: 'center' as const,
  },
  backLink: {
    fontSize: '15px',
    color: theme.colors.gold,
    textDecoration: 'none',
    fontWeight: 600,
    fontFamily: 'Poppins, sans-serif',
  },
};
