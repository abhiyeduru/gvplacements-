import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './pages/AdminDashboard';
import TestPage from './pages/TestPage';
import FirestoreDebugPage from './pages/FirestoreDebugPage';
import RazorpayDiagnostic from './pages/RazorpayDiagnostic';
import RazorpayTest from './pages/RazorpayTest';
import RazorpayTerms from './pages/RazorpayTerms';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import AlternateDomain from './pages/AlternateDomain';
import PaymentReturn from './pages/PaymentReturn';
import { theme } from './styles/theme';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Check if test page is requested
  if (window.location.pathname === '/test') {
    return <TestPage />;
  }

  // Check if debug page is requested
  if (window.location.pathname === '/debug') {
    return <FirestoreDebugPage />;
  }

  // Check if Razorpay diagnostic page is requested
  if (window.location.pathname === '/razorpay-diagnostic') {
    return <RazorpayDiagnostic />;
  }

  // Check if Razorpay test page is requested
  if (window.location.pathname === '/razorpay-test') {
    return <RazorpayTest />;
  }

  // Check if Razorpay terms page is requested
  if (window.location.pathname === '/razorpay-terms') {
    return <RazorpayTerms onClose={() => window.history.back()} />;
  }

  // Check for policy pages
  if (window.location.pathname === '/about') {
    return <AboutUs />;
  }

  if (window.location.pathname === '/contact') {
    return <ContactUs />;
  }

  if (window.location.pathname === '/privacy') {
    return <PrivacyPolicy />;
  }

  if (window.location.pathname === '/refund') {
    return <RefundPolicy />;
  }

  if (window.location.pathname === '/terms') {
    return <TermsAndConditions />;
  }

  if (window.location.pathname === '/domains') {
    return <AlternateDomain />;
  }

  if (window.location.pathname === '/payment-return') {
    return <PaymentReturn />;
  }

  // Admin access with password
  const handleAdminAccess = () => {
    const password = prompt('Enter admin password:');
    if (password === 'Gravity!)#8') {
      setIsAdminMode(true);
    } else {
      alert('Invalid password');
    }
  };

  if (isAdminMode) {
    return (
      <div>
        <AdminDashboard />
        <button
          onClick={() => setIsAdminMode(false)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: theme.colors.red,
            color: 'white',
            border: 'none',
            borderRadius: theme.radius,
            padding: '10px 16px',
            fontSize: '14px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          Exit Admin
        </button>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          gravity<span style={{ color: theme.colors.gold }}>.</span>
        </div>
        <div style={styles.navRight}>
          <button style={styles.adminLink} onClick={handleAdminAccess}>
            Admin
          </button>
          <button style={styles.navCta} onClick={() => setShowForm(true)}>
            Register Now →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.badgeDot} />
          Now accepting registrations
        </div>
        <h1 style={styles.h1}>
          Launch Your Career<br />
          with <span style={{ color: theme.colors.gold }}>Expert Guidance</span>
        </h1>
        <p style={styles.heroSub}>
          Professional job placement assistance with dedicated interview scheduling,
          career coaching, and direct employer connections.
        </p>
        <div style={styles.heroBtns}>
          <button style={styles.btnPrimary} onClick={() => setShowForm(true)}>
            Get Job Assistance Now →
          </button>
          <button style={styles.btnGhost} onClick={() => {
            const elem = document.getElementById('how-it-works');
            elem?.scrollIntoView({ behavior: 'smooth' });
          }}>
            How it works
          </button>
        </div>
      </section>

      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.stats}>
          <StatCard num="500+" label="Candidates Placed" />
          <StatCard num="92%" label="Success Rate" />
          <StatCard num="48hr" label="Avg. Interview Time" />
        </div>
      </div>

      {/* How It Works */}
      <section style={styles.section} id="how-it-works">
        <div style={styles.sectionLabel}>Process</div>
        <h2 style={styles.sectionTitle}>Simple. Fast. Effective.</h2>
        <div style={styles.steps}>
          <StepCard num="01" title="Register & Pay" desc="Fill your details and complete the ₹2000 registration fee securely via Razorpay." />
          <StepCard num="02" title="Get Confirmed" desc="Instant confirmation via WhatsApp and Email. Your profile goes live immediately." />
          <StepCard num="03" title="Interview Scheduling" desc="Our team contacts you within 48 hours to schedule your first round of interviews." />
          <StepCard num="04" title="Get Placed" desc="Land your dream job. Our success-based commission model ensures we work hard for you." />
        </div>
      </section>

      {/* Pricing */}
      <section style={styles.section}>
        <div style={styles.sectionLabel}>Pricing</div>
        <h2 style={styles.sectionTitle}>Transparent Fees</h2>
        <div style={styles.pricingCard}>
          <div style={styles.pricingLogo}>
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400'%3E%3Crect fill='%23ffffff' width='800' height='400'/%3E%3Ctext x='50' y='150' font-size='80' font-weight='bold' fill='%231e3a8a'%3EGV%3C/text%3E%3Ctext x='50' y='250' font-size='40' fill='%231e3a8a'%3Econsultancy%3C/text%3E%3Ctext x='50' y='300' font-size='24' fill='%23666'%3ETraining and Placements%3C/text%3E%3C/svg%3E"
              alt="GV Consultancy"
              style={styles.logoImg}
            />
          </div>
          <div style={styles.pricingTag}>Registration Fee</div>
          <div style={styles.price}>₹1</div>
          <p style={styles.priceNote}>One-time · Non-refundable · Covers full placement support</p>
          <ul style={styles.featureList}>
            <li>Interview scheduling (2 phases)</li>
            <li>Job assistance & profile review</li>
            <li>Instant WhatsApp + Email confirmation</li>
            <li>Dedicated placement coordinator</li>
            <li>Success-based commission (only after placement)</li>
          </ul>
          <button style={{ ...styles.btnPrimary, width: '100%' }} onClick={() => setShowForm(true)}>
            Pay ₹1 & Start Your Career Journey 🚀
          </button>
        </div>
      </section>

      {/* Terms */}
      <section style={styles.section} id="terms">
        <div style={styles.sectionLabel}>Terms & Conditions</div>
        <h2 style={styles.sectionTitle}>What You Should Know</h2>
        <div style={styles.termsGrid}>
          <TermCard title="Registration & Payment" items={['₹2000 registration fee is non-refundable', 'Covers full interview scheduling cycle', 'Payment secured via Razorpay']} />
          <TermCard title="Interview Process" items={['Interviews conducted in 2 phases', 'Additional rounds may be scheduled', 'Candidates must attend all scheduled sessions']} />
          <TermCard title="Placement Commission" items={['1st Salary → 50% commission', '2nd Salary → 25% commission', '3rd Salary → 25% commission']} />
          <TermCard title="Communication & Disclaimer" items={['Confirmation sent via WhatsApp and Email', 'Mentneo/Gravity provides job assistance, not guaranteed placement', 'Serious interview participation is expected']} />
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <div style={styles.logo}>
              gravity<span style={{ color: theme.colors.gold }}>.</span>
            </div>
            <p style={styles.footerText}>Professional job placement assistance with dedicated interview scheduling and career coaching.</p>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Quick Links</h4>
            <ul style={styles.footerLinks}>
              <li><a href="/" style={styles.footerLink}>Home</a></li>
              <li><a href="/#how-it-works" style={styles.footerLink}>How It Works</a></li>
              <li><a href="/#terms" style={styles.footerLink}>Terms</a></li>
            </ul>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Policies</h4>
            <ul style={styles.footerLinks}>
              <li><a href="/about" style={styles.footerLink}>About Us</a></li>
              <li><a href="/terms" style={styles.footerLink}>Terms & Conditions</a></li>
              <li><a href="/privacy" style={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="/refund" style={styles.footerLink}>Refund Policy</a></li>
            </ul>
          </div>

          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Support</h4>
            <ul style={styles.footerLinks}>
              <li><a href="/contact" style={styles.footerLink}>Contact Us</a></li>
              <li><a href="/domains" style={styles.footerLink}>Alternate Domains</a></li>
              <li><a href="mailto:support@gvplacements.com" style={styles.footerLink}>Email Support</a></li>
            </ul>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p>© 2025 Gravity Job Placement. All rights reserved.</p>
          <p style={{ marginTop: '6px' }}>Secure payments via Razorpay | Data protected by Firebase</p>
        </div>
      </footer>

      {/* Modal */}
      {showForm && (
        <div style={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <RegistrationForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ num, label }: any) {
  return (
    <div style={styles.stat}>
      <div style={styles.statNum}>{num}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}

function StepCard({ num, title, desc }: any) {
  return (
    <div style={styles.step}>
      <div style={styles.stepNum}>{num}</div>
      <h3 style={styles.stepTitle}>{title}</h3>
      <p style={styles.stepDesc}>{desc}</p>
    </div>
  );
}

function TermCard({ title, items }: any) {
  return (
    <div style={styles.termCard}>
      <h3 style={styles.termTitle}>{title}</h3>
      <ul style={styles.termList}>
        {items.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  root: {
    background: theme.colors.bg,
    color: theme.colors.text,
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'clamp(12px, 4vw, 18px) clamp(16px, 5vw, 40px)',
    background: 'rgba(10,10,15,0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  logo: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(18px, 5vw, 22px)',
    fontWeight: 800,
    letterSpacing: '-0.5px',
  },
  navRight: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: 'clamp(8px, 2vw, 12px)',
  },
  adminLink: {
    background: 'transparent',
    color: theme.colors.text2,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: '8px',
    padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)',
    fontSize: 'clamp(11px, 2vw, 13px)',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
  navCta: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: '8px',
    padding: 'clamp(8px, 2vw, 10px) clamp(16px, 3vw, 22px)',
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
  hero: {
    padding: 'clamp(120px, 20vw, 160px) clamp(16px, 5vw, 40px) clamp(60px, 15vw, 100px)',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  heroBadge: {
    display: 'inline-flex' as const,
    alignItems: 'center',
    gap: '8px',
    background: theme.colors.goldDim,
    border: `1px solid ${theme.colors.goldBorder}`,
    borderRadius: '50px',
    padding: '6px 16px',
    fontSize: 'clamp(11px, 2vw, 13px)',
    color: theme.colors.gold,
    marginBottom: 'clamp(20px, 5vw, 32px)',
  },
  badgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: theme.colors.gold,
    display: 'block',
  },
  h1: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(28px, 7vw, 68px)',
    fontWeight: 800,
    lineHeight: 1.08,
    letterSpacing: '-2px',
    marginBottom: 'clamp(16px, 4vw, 20px)',
  },
  heroSub: {
    fontSize: 'clamp(14px, 3vw, 18px)',
    color: theme.colors.text2,
    maxWidth: '560px',
    margin: '0 auto clamp(28px, 6vw, 44px)',
    lineHeight: 1.7,
    fontWeight: 300,
  },
  heroBtns: {
    display: 'flex' as const,
    gap: 'clamp(10px, 3vw, 14px)',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  btnPrimary: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: 'clamp(12px, 3vw, 16px) clamp(24px, 5vw, 36px)',
    fontSize: 'clamp(13px, 2vw, 16px)',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
  btnGhost: {
    background: 'transparent',
    color: theme.colors.text,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    padding: 'clamp(12px, 3vw, 16px) clamp(20px, 4vw, 32px)',
    fontSize: 'clamp(13px, 2vw, 16px)',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
  statsContainer: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 clamp(16px, 5vw, 40px)',
  },
  stats: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1px',
    background: theme.colors.border,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    overflow: 'hidden',
  },
  stat: {
    background: theme.colors.bg2,
    padding: 'clamp(20px, 4vw, 30px)',
    textAlign: 'center' as const,
  },
  statNum: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 800,
    color: theme.colors.gold,
    marginBottom: '6px',
  },
  statLabel: {
    fontSize: 'clamp(11px, 2vw, 13px)',
    color: theme.colors.text3,
    letterSpacing: '0.5px',
  },
  section: {
    padding: 'clamp(50px, 10vw, 80px) clamp(16px, 5vw, 40px)',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  sectionLabel: {
    fontSize: 'clamp(10px, 2vw, 12px)',
    letterSpacing: '3px',
    color: theme.colors.gold,
    textTransform: 'uppercase' as const,
    marginBottom: '16px',
    fontWeight: 500,
  },
  sectionTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(24px, 6vw, 42px)',
    fontWeight: 700,
    letterSpacing: '-1px',
    marginBottom: 'clamp(32px, 6vw, 48px)',
  },
  steps: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 'clamp(12px, 3vw, 20px)',
  },
  step: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: 'clamp(20px, 4vw, 28px)',
  },
  stepNum: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(32px, 8vw, 48px)',
    fontWeight: 800,
    color: 'transparent',
    WebkitTextStroke: `1px ${theme.colors.goldBorder}`,
    lineHeight: 1,
    marginBottom: 'clamp(12px, 3vw, 16px)',
  },
  stepTitle: {
    fontSize: 'clamp(14px, 3vw, 16px)',
    fontWeight: 600,
    marginBottom: '8px',
  },
  stepDesc: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: theme.colors.text2,
    lineHeight: 1.6,
  },
  pricingCard: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.goldBorder}`,
    borderRadius: theme.radiusLg,
    padding: 'clamp(24px, 5vw, 40px)',
    maxWidth: '520px',
    margin: '0 auto',
  },
  pricingLogo: {
    display: 'flex' as const,
    justifyContent: 'center',
    marginBottom: '24px',
  },
  logoImg: {
    maxWidth: '150px',
    height: 'auto',
    borderRadius: '8px',
  },
  pricingTag: {
    display: 'inline-block',
    background: theme.colors.goldDim,
    color: theme.colors.gold,
    border: `1px solid ${theme.colors.goldBorder}`,
    borderRadius: '6px',
    fontSize: 'clamp(10px, 2vw, 12px)',
    padding: '4px 12px',
    marginBottom: '20px',
    fontWeight: 500,
  },
  price: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 'clamp(36px, 8vw, 52px)',
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: '6px',
  },
  priceNote: {
    fontSize: 'clamp(11px, 2vw, 13px)',
    color: theme.colors.text3,
    marginBottom: '28px',
  },
  featureList: {
    listStyle: 'none',
    marginBottom: '32px',
  },
  termsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 'clamp(12px, 3vw, 20px)',
  },
  termCard: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: 'clamp(20px, 4vw, 28px)',
  },
  termTitle: {
    fontSize: 'clamp(13px, 2vw, 15px)',
    fontWeight: 600,
    marginBottom: '12px',
    color: theme.colors.gold,
  },
  termList: {
    listStyle: 'none',
  },
  footer: {
    borderTop: `1px solid ${theme.colors.border}`,
    padding: 'clamp(24px, 5vw, 40px)',
    background: theme.colors.bg2,
  },
  footerContent: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'clamp(24px, 5vw, 40px)',
    marginBottom: '32px',
  },
  footerSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '12px',
  },
  footerTitle: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    fontWeight: 600,
    color: theme.colors.gold,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    margin: 0,
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: theme.colors.text2,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  footerText: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: theme.colors.text2,
    lineHeight: 1.6,
    margin: 0,
  },
  footerBottom: {
    maxWidth: '1000px',
    margin: '0 auto',
    paddingTop: '24px',
    borderTop: `1px solid ${theme.colors.border}`,
    textAlign: 'center' as const,
    color: theme.colors.text3,
    fontSize: 'clamp(11px, 2vw, 13px)',
  },
  modalOverlay: {
    position: 'fixed' as const,
    inset: 0,
    zIndex: 200,
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(12px, 3vw, 20px)',
  },
  modal: {
    width: '100%',
    maxWidth: '640px',
    maxHeight: '90vh',
    overflow: 'auto',
  },
};
