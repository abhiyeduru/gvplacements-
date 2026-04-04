import { theme } from '../styles/theme';

export default function AboutUs() {
  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          gravity<span style={{ color: theme.colors.gold }}>.</span>
        </a>
        <a href="/" style={styles.backBtn}>← Back to Home</a>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.title}>About Gravity Job Placement</h1>

        <section style={styles.section}>
          <h2 style={styles.heading}>Who We Are</h2>
          <p style={styles.text}>
            Gravity Job Placement is a professional job placement and career assistance platform dedicated to connecting talented candidates with leading employers across India. We operate under the brand name "Gravity" and are committed to providing comprehensive job placement services with integrity and transparency.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Our Mission</h2>
          <p style={styles.text}>
            To empower job seekers with professional guidance, interview preparation, and direct employer connections, enabling them to secure meaningful employment opportunities and advance their careers.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>What We Do</h2>
          <ul style={styles.list}>
            <li>Professional job placement assistance and career coaching</li>
            <li>Interview scheduling and preparation guidance</li>
            <li>Resume review and profile optimization</li>
            <li>Direct connections with verified employers</li>
            <li>Post-placement support and career guidance</li>
            <li>Skill development and training resources</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Our Service Model</h2>
          <p style={styles.text}>
            We operate on a transparent, success-based commission model:
          </p>
          <ul style={styles.list}>
            <li><strong>Registration Fee:</strong> ₹2,000 (one-time, non-refundable) - Covers full placement support</li>
            <li><strong>Success Commission:</strong> Charged only after successful placement</li>
            <li><strong>1st Salary:</strong> 50% commission</li>
            <li><strong>2nd Salary:</strong> 25% commission</li>
            <li><strong>3rd Salary:</strong> 25% commission</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Why Choose Gravity?</h2>
          <ul style={styles.list}>
            <li>✓ 500+ candidates successfully placed</li>
            <li>✓ 92% success rate in job placements</li>
            <li>✓ Average interview scheduling within 48 hours</li>
            <li>✓ Dedicated placement coordinators</li>
            <li>✓ Transparent pricing with no hidden charges</li>
            <li>✓ Secure payment processing via Razorpay</li>
            <li>✓ Professional and ethical business practices</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Company Information</h2>
          <div style={styles.infoBox}>
            <p><strong>Business Name:</strong> Gravity Job Placement</p>
            <p><strong>Operating Brand:</strong> Gravity</p>
            <p><strong>Service Type:</strong> Job Placement & Career Assistance</p>
            <p><strong>Payment Gateway:</strong> Razorpay (PCI-DSS Compliant)</p>
            <p><strong>Data Storage:</strong> Firebase (ISO 27001 Certified)</p>
            <p><strong>Website:</strong> https://www.gvplacements.com</p>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Our Commitment</h2>
          <p style={styles.text}>
            We are committed to:
          </p>
          <ul style={styles.list}>
            <li>Providing honest and transparent information about our services</li>
            <li>Protecting candidate data and privacy</li>
            <li>Maintaining ethical business practices</li>
            <li>Delivering quality job placement services</li>
            <li>Ensuring secure payment processing</li>
            <li>Complying with all applicable laws and regulations</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.heading}>Contact Us</h2>
          <div style={styles.infoBox}>
            <p><strong>Email:</strong> support@gvplacements.com</p>
            <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
            <p><strong>Website:</strong> https://www.gvplacements.com</p>
            <p><strong>Address:</strong> Hyderabad, India</p>
          </div>
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '60px 40px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 800,
    marginBottom: '40px',
    color: '#ffffff',
  },
  section: {
    marginBottom: '40px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '16px',
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
  infoBox: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '24px',
  },
  footer: {
    borderTop: `1px solid ${theme.colors.border}`,
    padding: '24px 40px',
    textAlign: 'center' as const,
    color: theme.colors.text3,
    fontSize: '13px',
  },
};
