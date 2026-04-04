import { useState } from 'react';
import { theme } from '../styles/theme';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <a href="/" style={styles.logo}>
          gravity<span style={{ color: theme.colors.gold }}>.</span>
        </a>
        <a href="/" style={styles.backBtn}>← Back to Home</a>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>Get in touch with our team. We're here to help!</p>

        <div style={styles.grid}>
          {/* Contact Information */}
          <div style={styles.infoSection}>
            <h2 style={styles.heading}>Get in Touch</h2>

            <div style={styles.contactItem}>
              <h3 style={styles.contactTitle}>📧 Email</h3>
              <p style={styles.contactText}>support@gvplacements.com</p>
              <p style={styles.contactSubtext}>We respond within 24 hours</p>
            </div>

            <div style={styles.contactItem}>
              <h3 style={styles.contactTitle}>📱 Phone</h3>
              <p style={styles.contactText}>+91-XXXXXXXXXX</p>
              <p style={styles.contactSubtext}>Monday - Friday, 9 AM - 6 PM IST</p>
            </div>

            <div style={styles.contactItem}>
              <h3 style={styles.contactTitle}>📍 Address</h3>
              <p style={styles.contactText}>Hyderabad, India</p>
              <p style={styles.contactSubtext}>Service available across India</p>
            </div>

            <div style={styles.contactItem}>
              <h3 style={styles.contactTitle}>🌐 Website</h3>
              <p style={styles.contactText}>https://www.gvplacements.com</p>
              <p style={styles.contactSubtext}>Available 24/7</p>
            </div>

            <div style={styles.faqBox}>
              <h3 style={styles.faqTitle}>Common Questions</h3>
              <ul style={styles.faqList}>
                <li><strong>Registration Fee:</strong> ₹2,000 (one-time, non-refundable)</li>
                <li><strong>Interview Timeline:</strong> Within 48 hours of registration</li>
                <li><strong>Payment Method:</strong> Razorpay (secure & encrypted)</li>
                <li><strong>Support:</strong> Email & WhatsApp assistance</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.formSection}>
            <h2 style={styles.heading}>Send us a Message</h2>
            {submitted ? (
              <div style={styles.successMessage}>
                <p style={styles.successText}>✓ Thank you for your message!</p>
                <p style={styles.successSubtext}>We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.input}
                    placeholder="Your name"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={styles.input}
                    placeholder="your@email.com"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={styles.input}
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...styles.input, minHeight: '120px', resize: 'vertical' }}
                    placeholder="Your message..."
                  />
                </div>

                <button type="submit" style={styles.submitBtn}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
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
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '60px 40px',
  },
  title: {
    fontSize: '42px',
    fontWeight: 800,
    marginBottom: '12px',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '16px',
    color: theme.colors.text2,
    marginBottom: '40px',
  },
  grid: {
    display: 'grid' as const,
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  infoSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '24px',
  },
  formSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '24px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 700,
    color: theme.colors.gold,
  },
  contactItem: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '20px',
  },
  contactTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#ffffff',
  },
  contactText: {
    fontSize: '15px',
    color: '#e4e4e7',
    marginBottom: '4px',
  },
  contactSubtext: {
    fontSize: '13px',
    color: theme.colors.text3,
  },
  faqBox: {
    background: theme.colors.goldDim,
    border: `1px solid ${theme.colors.goldBorder}`,
    borderRadius: '12px',
    padding: '20px',
  },
  faqTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.colors.gold,
    marginBottom: '12px',
  },
  faqList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  form: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '20px',
  },
  formGroup: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#e4e4e7',
  },
  input: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#e4e4e7',
    fontFamily: "'Poppins', sans-serif",
  },
  submitBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    marginTop: '8px',
  },
  successMessage: {
    background: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid #22c55e',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center' as const,
  },
  successText: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#22c55e',
    marginBottom: '8px',
  },
  successSubtext: {
    fontSize: '14px',
    color: theme.colors.text2,
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
