import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { theme } from '../styles/theme';

export default function FirestoreDebugPage() {
  const [status, setStatus] = useState('Loading...');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testing Firestore connection...');
        console.log('DB object:', db);

        if (!db) {
          setStatus('❌ Firebase DB not initialized');
          setError('Firebase database object is null');
          setLoading(false);
          return;
        }

        setStatus('✓ Firebase DB initialized, fetching data...');

        const q = query(collection(db, 'candidates'), orderBy('createdAt', 'desc'));
        console.log('📋 Query created:', q);

        const snapshot = await getDocs(q);
        console.log('📊 Snapshot received:', snapshot);
        console.log('📊 Number of docs:', snapshot.docs.length);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('✓ Data fetched:', data);
        setCandidates(data);
        setStatus(`✓ Successfully fetched ${data.length} candidates from Firestore`);
        setLoading(false);
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err instanceof Error ? err.message : String(err));
        setStatus('❌ Error fetching data');
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Firestore Debug Page</h1>
        <p>Testing Firestore connection and data retrieval</p>
      </div>

      <div style={styles.card}>
        <h2>Connection Status</h2>
        <div style={{
          ...styles.status,
          background: status.includes('✓') ? '#10b981' : status.includes('❌') ? '#ef4444' : '#f59e0b',
        }}>
          {status}
        </div>
      </div>

      {error && (
        <div style={styles.card}>
          <h2>Error Details</h2>
          <div style={styles.error}>
            {error}
          </div>
        </div>
      )}

      <div style={styles.card}>
        <h2>Candidates Found: {candidates.length}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : candidates.length === 0 ? (
          <p style={{ color: theme.colors.text3 }}>No candidates found in Firestore</p>
        ) : (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div style={styles.tableCell}>Name</div>
              <div style={styles.tableCell}>Email</div>
              <div style={styles.tableCell}>Phone</div>
              <div style={styles.tableCell}>Status</div>
            </div>
            {candidates.map(candidate => (
              <div key={candidate.id} style={styles.tableRow}>
                <div style={styles.tableCell}>{candidate.name}</div>
                <div style={styles.tableCell}>{candidate.email}</div>
                <div style={styles.tableCell}>{candidate.phone}</div>
                <div style={styles.tableCell}>{candidate.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.card}>
        <h2>Raw Data (JSON)</h2>
        <pre style={styles.json}>
          {JSON.stringify(candidates, null, 2)}
        </pre>
      </div>

      <div style={styles.card}>
        <h2>Console Output</h2>
        <p>Check browser console (F12) for detailed logs</p>
        <button
          onClick={() => window.location.href = '/'}
          style={styles.button}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: theme.colors.bg,
    color: theme.colors.text,
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 40px',
  },
  card: {
    maxWidth: '1200px',
    margin: '0 auto 20px',
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: '24px',
  },
  status: {
    padding: '16px',
    borderRadius: theme.radius,
    color: 'white',
    fontWeight: 600,
    fontSize: '16px',
  },
  error: {
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.red}`,
    color: theme.colors.red,
    padding: '16px',
    borderRadius: theme.radius,
    fontFamily: 'monospace',
    fontSize: '14px',
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  tableHeader: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    padding: '12px',
    background: theme.colors.bg3,
    borderRadius: theme.radius,
    fontWeight: 600,
    marginBottom: '12px',
  },
  tableRow: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    padding: '12px',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  tableCell: {
    padding: '8px',
    fontSize: '14px',
  },
  json: {
    background: theme.colors.bg3,
    padding: '16px',
    borderRadius: theme.radius,
    overflow: 'auto',
    maxHeight: '400px',
    fontSize: '12px',
    fontFamily: 'monospace',
    color: theme.colors.text2,
  },
  button: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
  },
};
