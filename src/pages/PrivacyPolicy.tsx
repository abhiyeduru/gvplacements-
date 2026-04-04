import { theme } from '../styles/theme';

export default function PrivacyPolicy() {
  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          gravity<span style={{ color: theme.colors.gold }}>.</span>
        </a>
        <a href="/" style={styles.backBtn}>← Back to Home</a>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.lastUpdated}>Last Updated: April 2025</p>

        <section style={styles.section}>
          <h2 style={styles.heading}>1. Introduction</h2>
          <p style={styles.text}>
            Gravity Job Placement ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://www.gvplacements.com and use our job placement services.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>2. Information We Collect</h2>
          <p style={styles.text}>We collect information you provide directly to us, including:</p>
          <ul style={styles.list}>
            <li>Personal identification information (name, email, phone number, date of birth)</li>
            <li>Professional information (resume, qualifications, work experience)</li>
            <li>Address and contact details</li>
            <li>Government ID information (PAN, Aadhar)</li>
            <li>Payment information (processed securely via Razorpay)</li>
            <li>Communication records and correspondence</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>3. How We Use Your Information</h2>
          <p style={styles.text}>We use the information we collect for:</p>
          <ul style={styles.list}>
            <li>Processing your registration and payment</li>
            <li>Scheduling interviews and connecting you with employers</li>
            <li>Providing job placement assistance and career coaching</li>
            <li>Communicating with you via email, phone, or WhatsApp</li>
            <li>Improving our services and user experience</li>
            <li>Complying with legal obligations</li>
            <li>Fraud prevention and security</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>4. Data Security</h2>
          <p style={styles.text}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using Firebase (ISO 27001 certified) and payment information is processed through Razorpay (PCI-DSS compliant).
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>5. Data Sharing</h2>
          <p style={styles.text}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul style={styles.list}>
            <li>Employers and recruiters (for job placement purposes)</li>
            <li>Payment processors (Razorpay) for secure transactions</li>
            <li>Service providers who assist us in operating our website</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>6. Your Rights</h2>
          <p style={styles.text}>You have the right to:</p>
          <ul style={styles.list}>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data (subject to legal requirements)</li>
            <li>Opt-out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>7. Cookies and Tracking</h2>
          <p style={styles.text}>
            Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>8. Third-Party Links</h2>
          <p style={styles.text}>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. Please review their privacy policies before providing any information.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>9. Children's Privacy</h2>
          <p style={styles.text}>
            Our services are not intended for individuals under 18 years of age. We do not knowingly collect information from children. If we become aware of such collection, we will delete the information immediately.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>10. Data Retention</h2>
          <p style={styles.text}>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time by contacting us.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>11. Changes to This Policy</h2>
          <p style={styles.text}>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website with a new "Last Updated" date.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>12. Contact Us</h2>
          <p style={styles.text}>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div style={styles.contactBox}>
            <p><strong>Email:</strong> support@gvplacements.com</p>
            <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
            <p><strong>Website:</strong> https://www.gvplacements.com</p>
          </div>
        </section>

        <section style={styles.section}>
          <p style={styles.disclaimer}>
            By using our website and services, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
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
