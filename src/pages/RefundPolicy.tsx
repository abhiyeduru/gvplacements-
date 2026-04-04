import { theme } from '../styles/theme';

export default function RefundPolicy() {
  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          gravity<span style={{ color: theme.colors.gold }}>.</span>
        </a>
        <a href="/" style={styles.backBtn}>← Back to Home</a>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.title}>Refund & Cancellation Policy</h1>
        <p style={styles.lastUpdated}>Last Updated: April 2025</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Registration Fee Policy</h2>
          <p style={styles.text}>
            The registration fee of ₹2,000 is <strong>non-refundable</strong>. This fee covers the cost of:
          </p>
          <ul style={styles.list}>
            <li>Profile creation and verification</li>
            <li>Resume review and optimization</li>
            <li>Interview scheduling and coordination</li>
            <li>Dedicated placement coordinator assignment</li>
            <li>Access to job opportunities</li>
            <li>Career coaching and guidance</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Cancellation Policy</h2>
          <p style={styles.text}>
            Once your registration is complete and payment is processed, the following cancellation policy applies:
          </p>
          <ul style={styles.list}>
            <li><strong>Within 24 hours of registration:</strong> You may request cancellation with a full refund (minus payment gateway charges)</li>
            <li><strong>After 24 hours:</strong> No refund is available. Your registration remains active for 12 months</li>
            <li><strong>Cancellation requests:</strong> Must be submitted in writing to support@gvplacements.com</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. Refund Eligibility</h2>
          <p style={styles.text}>
            Refunds are <strong>NOT</strong> available in the following cases:
          </p>
          <ul style={styles.list}>
            <li>Candidate fails to attend scheduled interviews without prior notice</li>
            <li>Candidate provides false or misleading information</li>
            <li>Candidate violates our code of conduct</li>
            <li>Candidate requests cancellation after 24 hours of registration</li>
            <li>Services have already been provided (interviews scheduled, profile shared with employers)</li>
            <li>Candidate is not selected by employers (placement is not guaranteed)</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Refund Process</h2>
          <p style={styles.text}>
            If you are eligible for a refund:
          </p>
          <ul style={styles.list}>
            <li>Submit a written cancellation request within 24 hours of registration</li>
            <li>Include your registration email and transaction ID</li>
            <li>We will verify your request and process the refund within 5-7 business days</li>
            <li>Refunds are credited to the original payment method (Razorpay)</li>
            <li>Payment gateway charges (if any) will be deducted from the refund amount</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Placement Commission</h2>
          <p style={styles.text}>
            Success-based commission is charged only after successful placement:
          </p>
          <ul style={styles.list}>
            <li><strong>1st Salary:</strong> 50% commission (deducted from salary)</li>
            <li><strong>2nd Salary:</strong> 25% commission (deducted from salary)</li>
            <li><strong>3rd Salary:</strong> 25% commission (deducted from salary)</li>
            <li>Commission is collected directly from your employer</li>
            <li>No additional charges after placement</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Service Guarantee</h2>
          <p style={styles.text}>
            We guarantee:
          </p>
          <ul style={styles.list}>
            <li>Interview scheduling within 48 hours of registration</li>
            <li>Professional interview preparation guidance</li>
            <li>Dedicated placement coordinator support</li>
            <li>Regular follow-ups and career guidance</li>
            <li>Access to job opportunities for 12 months from registration</li>
          </ul>
          <p style={styles.text}>
            <strong>Note:</strong> We do NOT guarantee placement. Actual placement depends on your qualifications, interview performance, and market conditions.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Dispute Resolution</h2>
          <p style={styles.text}>
            If you have a dispute regarding your registration or refund:
          </p>
          <ul style={styles.list}>
            <li>Contact us at support@gvplacements.com with details</li>
            <li>We will investigate and respond within 7 business days</li>
            <li>If unresolved, disputes may be escalated to Razorpay for payment-related issues</li>
            <li>We are committed to fair and transparent resolution</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Account Suspension</h2>
          <p style={styles.text}>
            We reserve the right to suspend or terminate your account if:
          </p>
          <ul style={styles.list}>
            <li>You provide false or fraudulent information</li>
            <li>You violate our code of conduct or terms of service</li>
            <li>You engage in abusive or inappropriate behavior</li>
            <li>You repeatedly miss scheduled interviews without notice</li>
            <li>You violate any applicable laws or regulations</li>
          </ul>
          <p style={styles.text}>
            In case of account suspension, no refund will be provided.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Payment Gateway Issues</h2>
          <p style={styles.text}>
            If you experience issues with payment processing:
          </p>
          <ul style={styles.list}>
            <li>Contact Razorpay support directly for payment-related issues</li>
            <li>Provide your transaction ID and payment details</li>
            <li>We will assist in resolving any technical issues</li>
            <li>Duplicate charges will be refunded immediately</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Contact Us</h2>
          <p style={styles.text}>
            For refund requests or cancellation inquiries, please contact:
          </p>
          <div style={styles.contactBox}>
            <p><strong>Email:</strong> support@gvplacements.com</p>
            <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
            <p><strong>Website:</strong> https://www.gvplacements.com</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
          </div>
        </section>

        <section style={styles.section}>
          <p style={styles.disclaimer}>
            By registering with Gravity Job Placement, you acknowledge that you have read and understood this Refund & Cancellation Policy and agree to its terms.
          </p>
        </section>
      </div>

      <footer style={styles.footer}>
        <p>© 2025 Gravity Job Placement. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    background: '#0a0a0f',
    color: '#e4e4e7',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },
  nav: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 40px',
    borderBottom: `1px solid ${theme.colors.border}`,
    background: 'rgba(10,10,15,0.95)',
  },
  logo: {
    fontSize: '22px',
    fontWeight: 800,
    textDecoration: 'none',
    color: '#e4e4e7',
  },
  backBtn: {
    color: theme.colors.text2,
    textDecoration: 'none',
    fontSize: '14px',
    padding: '8px 16px',
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: '8px',
    cursor: 'pointer',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 40px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 800,
    marginBottom: '8px',
    color: '#ffffff',
  },
  lastUpdated: {
    fontSize: '13px',
    color: theme.colors.text3,
    marginBottom: '40px',
  },
  section: {
    marginBottom: '32px',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '12px',
    color: theme.colors.gold,
  },
  text: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: theme.colors.text2,
    marginBottom: '12px',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  contactBox: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '20px',
  },
  disclaimer: {
    fontSize: '14px',
    color: theme.colors.text3,
    fontStyle: 'italic',
    padding: '16px',
    background: theme.colors.bg2,
    borderRadius: '8px',
    borderLeft: `4px solid ${theme.colors.gold}`,
  },
  footer: {
    borderTop: `1px solid ${theme.colors.border}`,
    padding: '24px 40px',
    textAlign: 'center' as const,
    color: theme.colors.text3,
    fontSize: '13px',
    marginTop: '60px',
  },
};
