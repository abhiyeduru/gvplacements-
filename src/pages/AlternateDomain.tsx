import { theme } from '../styles/theme';

export default function AlternateDomain() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Domain Information</h1>
        <p style={styles.subtitle}>Access our services through multiple domains</p>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Primary Domains</h2>
          <div style={styles.domainGrid}>
            <DomainCard 
              domain="www.gvplacements.com"
              status="Active"
              description="Main production domain"
              icon="🌐"
            />
            <DomainCard 
              domain="gvplacements.com"
              status="Active"
              description="Alternative domain"
              icon="🔗"
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Firebase Hosting Domains</h2>
          <div style={styles.domainGrid}>
            <DomainCard 
              domain="gvplacements.web.app"
              status="Active"
              description="Firebase hosting (primary)"
              icon="🔥"
            />
            <DomainCard 
              domain="gravi-multiple.web.app"
              status="Active"
              description="Firebase hosting (secondary)"
              icon="🔥"
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Alternate Access Methods</h2>
          <div style={styles.methodsList}>
            <MethodItem 
              title="Direct IP Access"
              description="Access via IP address if domain is unavailable"
              icon="📍"
            />
            <MethodItem 
              title="Mobile App"
              description="Download our mobile application for seamless access"
              icon="📱"
            />
            <MethodItem 
              title="Email Access"
              description="Receive registration links via email"
              icon="📧"
            />
            <MethodItem 
              title="WhatsApp Access"
              description="Get registration link via WhatsApp"
              icon="💬"
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Domain Status</h2>
          <div style={styles.statusTable}>
            <div style={styles.statusRow}>
              <span style={styles.statusLabel}>Primary Domain</span>
              <span style={styles.statusBadge}>✓ Online</span>
            </div>
            <div style={styles.statusRow}>
              <span style={styles.statusLabel}>Firebase Hosting</span>
              <span style={styles.statusBadge}>✓ Online</span>
            </div>
            <div style={styles.statusRow}>
              <span style={styles.statusLabel}>Backend API</span>
              <span style={styles.statusBadge}>✓ Online</span>
            </div>
            <div style={styles.statusRow}>
              <span style={styles.statusLabel}>Database</span>
              <span style={styles.statusBadge}>✓ Online</span>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Troubleshooting</h2>
          <div style={styles.troubleList}>
            <TroubleItem 
              issue="Domain not loading"
              solution="Try clearing browser cache (Ctrl+Shift+Delete) and refresh"
            />
            <TroubleItem 
              issue="Slow loading"
              solution="Check your internet connection or try alternate domain"
            />
            <TroubleItem 
              issue="Payment not working"
              solution="Ensure you're on a whitelisted domain or use Firebase hosting URL"
            />
            <TroubleItem 
              issue="Can't access from specific region"
              solution="Try using VPN or contact support for regional access"
            />
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact Support</h2>
          <div style={styles.contactInfo}>
            <p style={styles.contactText}>
              <strong>Email:</strong> support@gvplacements.com
            </p>
            <p style={styles.contactText}>
              <strong>WhatsApp:</strong> +91-XXXXXXXXXX
            </p>
            <p style={styles.contactText}>
              <strong>Website:</strong> https://www.gvplacements.com
            </p>
          </div>
        </section>
      </div>

      <div style={styles.footer}>
        <a href="/" style={styles.backLink}>← Back to Home</a>
      </div>
    </div>
  );
}

function DomainCard({ domain, status, description, icon }: any) {
  return (
    <div style={styles.domainCard}>
      <div style={styles.domainIcon}>{icon}</div>
      <div style={styles.domainName}>{domain}</div>
      <div style={styles.domainStatus}>{status}</div>
      <div style={styles.domainDesc}>{description}</div>
    </div>
  );
}

function MethodItem({ title, description, icon }: any) {
  return (
    <div style={styles.methodItem}>
      <div style={styles.methodIcon}>{icon}</div>
      <div>
        <div style={styles.methodTitle}>{title}</div>
        <div style={styles.methodDesc}>{description}</div>
      </div>
    </div>
  );
}

function TroubleItem({ issue, solution }: any) {
  return (
    <div style={styles.troubleItem}>
      <div style={styles.troubleIssue}>❌ {issue}</div>
      <div style={styles.troubleSolution}>✓ {solution}</div>
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
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: '20px',
    fontFamily: 'Poppins, sans-serif',
  },
  domainGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  },
  domainCard: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center' as const,
  },
  domainIcon: {
    fontSize: '32px',
    marginBottom: '12px',
  },
  domainName: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.colors.gold,
    marginBottom: '8px',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
  },
  domainStatus: {
    fontSize: '13px',
    color: '#22c55e',
    fontWeight: 500,
    marginBottom: '8px',
  },
  domainDesc: {
    fontSize: '13px',
    color: theme.colors.text2,
  },
  methodsList: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },
  methodItem: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '20px',
    display: 'flex' as const,
    gap: '16px',
  },
  methodIcon: {
    fontSize: '28px',
    minWidth: '40px',
  },
  methodTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: '4px',
  },
  methodDesc: {
    fontSize: '13px',
    color: theme.colors.text2,
  },
  statusTable: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    overflow: 'hidden',
  },
  statusRow: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  statusLabel: {
    fontSize: '15px',
    color: theme.colors.text,
    fontWeight: 500,
  },
  statusBadge: {
    fontSize: '13px',
    color: '#22c55e',
    fontWeight: 600,
    background: 'rgba(34, 197, 94, 0.1)',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  troubleList: {
    display: 'grid' as const,
    gap: '16px',
  },
  troubleItem: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '16px',
  },
  troubleIssue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ef4444',
    marginBottom: '8px',
  },
  troubleSolution: {
    fontSize: '14px',
    color: '#22c55e',
  },
  contactInfo: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    padding: '24px',
  },
  contactText: {
    fontSize: '15px',
    color: theme.colors.text,
    margin: '8px 0',
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
