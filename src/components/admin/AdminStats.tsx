import { CandidateData } from '../../types';
import { theme } from '../../styles/theme';

interface AdminStatsProps {
  candidates: CandidateData[];
}

export default function AdminStats({ candidates }: AdminStatsProps) {
  const totalCandidates = candidates.length;
  const successfulPayments = candidates.filter(c => c.paymentStatus === 'success').length;
  const placedCandidates = candidates.filter(c => c.status === 'placed').length;
  const totalRevenue = successfulPayments * 1000;

  const stats = [
    { label: 'Total Candidates', value: totalCandidates, icon: '👥' },
    { label: 'Successful Payments', value: successfulPayments, icon: '✓' },
    { label: 'Placed', value: placedCandidates, icon: '🎯' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰' },
  ];

  return (
    <div style={styles.statsGrid}>
      {stats.map((stat, i) => (
        <div key={i} style={styles.statCard}>
          <div style={styles.statIcon}>{stat.icon}</div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  statsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
  },
  statCard: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: '20px',
    display: 'flex' as const,
    alignItems: 'center',
    gap: '16px',
  },
  statIcon: {
    fontSize: '32px',
  },
  statContent: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '4px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    color: theme.colors.gold,
  },
  statLabel: {
    fontSize: '12px',
    color: theme.colors.text3,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
};
