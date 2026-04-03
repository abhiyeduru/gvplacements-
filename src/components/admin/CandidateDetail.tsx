import { useState } from 'react';
import { CandidateData } from '../../types';
import { theme } from '../../styles/theme';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface CandidateDetailProps {
  candidate: CandidateData;
  onBack: () => void;
}

export default function CandidateDetail({ candidate, onBack }: CandidateDetailProps) {
  const [status, setStatus] = useState(candidate.status);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleStatusUpdate = async () => {
    if (status === candidate.status) return;
    
    setSaving(true);
    try {
      const candidateRef = doc(db, 'candidates', candidate.id!);
      await updateDoc(candidateRef, { status });
      setMessage('Status updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage('Error updating status');
    } finally {
      setSaving(false);
    }
  };

  const date = new Date(candidate.createdAt).toLocaleString();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h2 style={styles.title}>{candidate.name}</h2>
        <div style={styles.headerRight} />
      </div>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.content}>
        {/* Personal Info */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          <div style={styles.grid}>
            <InfoField label="Full Name" value={candidate.name} />
            <InfoField label="Father's Name" value={candidate.fatherName} />
            <InfoField label="Email" value={candidate.email} />
            <InfoField label="Phone" value={candidate.phone} />
            <InfoField label="Position" value={candidate.position} />
            {candidate.referralName && (
              <InfoField label="Referral Name" value={candidate.referralName} />
            )}
            <InfoField label="Terms Accepted" value={candidate.termsAccepted ? '✓ Yes' : '✗ No'} />
            <InfoField label="Registration Date" value={date} />
          </div>
        </section>

        {/* Address Info */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Address Information</h3>
          <div style={styles.grid}>
            <div style={styles.fullWidth}>
              <InfoField label="Current Address" value={candidate.currentAddress} />
            </div>
            <div style={styles.fullWidth}>
              <InfoField label="Permanent Address" value={candidate.permanentAddress} />
            </div>
            {candidate.notes && (
              <div style={styles.fullWidth}>
                <InfoField label="Additional Notes" value={candidate.notes} />
              </div>
            )}
          </div>
        </section>

        {/* Payment Info */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Payment Information</h3>
          <div style={styles.grid}>
            <InfoField label="Payment Status" value={candidate.paymentStatus} />
            <InfoField label="Payment Amount" value={`₹${candidate.paymentAmount}`} />
            {candidate.paymentId && (
              <InfoField label="Payment ID" value={candidate.paymentId} />
            )}
          </div>
        </section>

        {/* Documents */}
        {(candidate.resumeUrl || candidate.panUrl) && (
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Documents</h3>
            <div style={styles.documentsGrid}>
              {candidate.resumeUrl && (
                <DocumentLink label="Resume" url={candidate.resumeUrl} />
              )}
              {candidate.panUrl && (
                <DocumentLink label="PAN Card" url={candidate.panUrl} />
              )}
            </div>
          </section>
        )}

        {/* Status Update */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}>Update Status</h3>
          <div style={styles.statusUpdate}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              style={styles.statusSelect}
            >
              <option value="registered">Registered</option>
              <option value="confirmed">Confirmed</option>
              <option value="placed">Placed</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={saving || status === candidate.status}
              style={{
                ...styles.updateBtn,
                ...(saving || status === candidate.status ? styles.updateBtnDisabled : {}),
              }}
            >
              {saving ? 'Saving...' : 'Update Status'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.infoField}>
      <label style={styles.label}>{label}</label>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

function DocumentLink({ label, url }: { label: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={styles.docLink}>
      <div style={styles.docIcon}>📄</div>
      <div style={styles.docLabel}>{label}</div>
    </a>
  );
}

const styles = {
  container: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '24px',
  },
  header: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  backBtn: {
    background: 'transparent',
    border: `1px solid ${theme.colors.border2}`,
    color: theme.colors.text2,
    borderRadius: theme.radius,
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
    flex: 1,
  },
  headerRight: {
    flex: 1,
  },
  message: {
    background: 'rgba(34,197,94,0.15)',
    color: '#22c55e',
    padding: '12px 16px',
    borderRadius: theme.radius,
    fontSize: '14px',
  },
  content: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '24px',
  },
  section: {
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius,
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.gold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: '0 0 16px 0',
  },
  grid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  infoField: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    color: theme.colors.text3,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    fontWeight: 500,
  },
  value: {
    fontSize: '14px',
    color: theme.colors.text,
    wordBreak: 'break-word' as const,
  },
  documentsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  },
  docLink: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius,
    padding: '16px',
    textDecoration: 'none',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  docIcon: {
    fontSize: '32px',
  },
  docLabel: {
    fontSize: '12px',
    color: theme.colors.gold,
    fontWeight: 600,
  },
  statusUpdate: {
    display: 'flex' as const,
    gap: '12px',
    alignItems: 'center',
  },
  statusSelect: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    color: theme.colors.text,
    padding: '10px 12px',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    flex: 1,
    cursor: 'pointer',
  },
  updateBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
  },
  updateBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
