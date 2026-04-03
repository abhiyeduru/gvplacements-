import { CandidateData } from '../../types';
import { theme } from '../../styles/theme';

interface CandidateTableProps {
  candidates: CandidateData[];
  onSelectCandidate: (candidate: CandidateData) => void;
}

export default function CandidateTable({ candidates, onSelectCandidate }: CandidateTableProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; color: string }> = {
      success: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
      pending: { bg: 'rgba(245,166,35,0.15)', color: '#f5a623' },
      failed: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
    };
    return statusMap[status] || statusMap.pending;
  };

  const getPlacementBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; color: string }> = {
      placed: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
      registered: { bg: 'rgba(160,174,192,0.15)', color: '#a0aec0' },
      confirmed: { bg: 'rgba(245,166,35,0.15)', color: '#f5a623' },
    };
    return statusMap[status] || statusMap.registered;
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Payment</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => {
            const paymentBadge = getStatusBadge(candidate.paymentStatus);
            const placementBadge = getPlacementBadge(candidate.status);
            const date = new Date(candidate.createdAt).toLocaleDateString();

            return (
              <tr key={candidate.id} style={styles.bodyRow}>
                <td style={styles.td}>
                  <div style={styles.nameCell}>
                    <div style={styles.avatar}>{candidate.name.charAt(0)}</div>
                    <div>
                      <div style={styles.name}>{candidate.name}</div>
                      <div style={styles.fatherName}>{candidate.fatherName}</div>
                      {candidate.referralName && (
                        <div style={styles.referralName}>Ref: {candidate.referralName}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td style={styles.td}>
                  <a href={`mailto:${candidate.email}`} style={styles.email}>
                    {candidate.email}
                  </a>
                </td>
                <td style={styles.td}>{candidate.phone}</td>
                <td style={styles.td}>
                  <span style={styles.position}>{candidate.position}</span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: paymentBadge.bg,
                      color: paymentBadge.color,
                    }}
                  >
                    {candidate.paymentStatus === 'success' ? '✓' : '○'} {candidate.paymentStatus}
                  </span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: placementBadge.bg,
                      color: placementBadge.color,
                    }}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={styles.date}>{date}</span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => onSelectCandidate(candidate)}
                    style={styles.viewBtn}
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableContainer: {
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  headerRow: {
    background: theme.colors.bg3,
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left' as const,
    fontWeight: 600,
    color: theme.colors.text2,
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  bodyRow: {
    borderBottom: `1px solid ${theme.colors.border}`,
    transition: 'background 0.2s',
  },
  td: {
    padding: '16px',
    verticalAlign: 'middle' as const,
  },
  nameCell: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: theme.colors.gold,
    color: '#0a0a0f',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '14px',
  },
  name: {
    fontWeight: 600,
    color: theme.colors.text,
  },
  fatherName: {
    fontSize: '12px',
    color: theme.colors.text3,
  },
  referralName: {
    fontSize: '11px',
    color: theme.colors.gold,
    marginTop: '2px',
    fontWeight: 500,
  },
  email: {
    color: theme.colors.gold,
    textDecoration: 'none',
  },
  position: {
    background: theme.colors.goldDim,
    color: theme.colors.gold,
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
  },
  date: {
    color: theme.colors.text3,
    fontSize: '12px',
  },
  viewBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
};
