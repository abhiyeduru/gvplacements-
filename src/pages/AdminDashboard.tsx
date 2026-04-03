import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CandidateData } from '../types';
import { theme } from '../styles/theme';
import CandidateTable from '../components/admin/CandidateTable';
import CandidateDetail from '../components/admin/CandidateDetail';
import AdminStats from '../components/admin/AdminStats';
import PaymentSettings from '../components/admin/PaymentSettings';
import { seedDatabase } from '../services/seedData';

// Admin Dashboard - Candidate Management
export default function AdminDashboard() {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'success' | 'placed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!db) {
      console.warn('⚠️ Firebase not connected');
      setFirebaseError('Firebase not connected. Running in demo mode.');
      setLoading(false);
      return;
    }

    console.log('📡 Setting up Firestore listener...');
    setLoading(true);
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    const q = query(collection(db, 'candidates'), ...constraints);

    try {
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log('✓ Snapshot received:', snapshot.docs.length, 'documents');
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as CandidateData[];
          console.log('✓ Data mapped:', data);
          setCandidates(data);
          setLoading(false);
        },
        (error) => {
          console.error('❌ Error fetching candidates:', error);
          setFirebaseError('Error loading candidates from Firebase');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('❌ Error setting up listener:', error);
      setFirebaseError('Error connecting to Firebase');
      setLoading(false);
    }
  }, []);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesFilter = filter === 'all' || candidate.paymentStatus === filter;
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>
            gravity<span style={{ color: theme.colors.gold }}>.</span> Admin
          </h1>
          <div style={styles.navRight}>
            <span style={styles.userInfo}>Admin Panel</span>
          </div>
        </div>
      </nav>

      <div style={styles.container}>
        {/* Error Banner */}
        {firebaseError && (
          <div style={styles.errorBanner}>
            ⚠️ {firebaseError}
          </div>
        )}

        {/* Stats Section */}
        <AdminStats candidates={candidates} />

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.filterSection}>
              <h3 style={styles.filterTitle}>Filters</h3>
              
              <div style={styles.searchBox}>
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                />
              </div>

              <div style={styles.filterButtons}>
                {(['all', 'pending', 'success', 'placed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    style={{
                      ...styles.filterBtn,
                      ...(filter === status && styles.filterBtnActive),
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              <div style={styles.resultCount}>
                {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''}
              </div>

              <button
                onClick={async () => {
                  setSeeding(true);
                  await seedDatabase();
                  setSeeding(false);
                }}
                disabled={seeding}
                style={{
                  ...styles.seedBtn,
                  ...(seeding && { opacity: 0.6, cursor: 'not-allowed' }),
                }}
              >
                {seeding ? 'Seeding...' : '🌱 Add Demo Data'}
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  ...styles.settingsBtn,
                  ...(showSettings && styles.settingsBtnActive),
                }}
              >
                {showSettings ? '✕ Close Settings' : '⚙️ Payment Settings'}
              </button>
            </div>
          </div>

          {/* Main Panel */}
          <div style={styles.mainPanel}>
            {showSettings ? (
              <PaymentSettings />
            ) : selectedCandidate ? (
              <CandidateDetail
                candidate={selectedCandidate}
                onBack={() => setSelectedCandidate(null)}
              />
            ) : (
              <>
                <div style={styles.panelHeader}>
                  <h2 style={styles.panelTitle}>Registered Candidates</h2>
                </div>

                {loading ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.spinner} />
                    <p>Loading candidates...</p>
                  </div>
                ) : filteredCandidates.length === 0 ? (
                  <div style={styles.emptyState}>
                    <p>No candidates found</p>
                  </div>
                ) : (
                  <CandidateTable
                    candidates={filteredCandidates}
                    onSelectCandidate={setSelectedCandidate}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: {
    background: theme.colors.bg,
    color: theme.colors.text,
    minHeight: '100vh',
    fontFamily: "'DM Sans', sans-serif",
  },
  nav: {
    background: theme.colors.bg2,
    borderBottom: `1px solid ${theme.colors.border}`,
    padding: '0 40px',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  navContent: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  logo: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '24px',
    fontWeight: 800,
    margin: 0,
  },
  navRight: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: '20px',
  },
  userInfo: {
    fontSize: '14px',
    color: theme.colors.text2,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  errorBanner: {
    background: 'rgba(239,68,68,0.15)',
    border: `1px solid rgba(239,68,68,0.3)`,
    color: '#ef4444',
    padding: '12px 16px',
    borderRadius: theme.radius,
    marginBottom: '20px',
    fontSize: '14px',
  },
  mainContent: {
    display: 'grid' as const,
    gridTemplateColumns: '280px 1fr',
    gap: '30px',
    marginTop: '30px',
  },
  sidebar: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: '24px',
    height: 'fit-content',
    position: 'sticky' as const,
    top: '100px',
  },
  filterSection: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
  },
  filterTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.gold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    margin: 0,
  },
  searchBox: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  searchInput: {
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    color: theme.colors.text,
    padding: '10px 12px',
    fontSize: '13px',
    fontFamily: "'Poppins', sans-serif",
    outline: 'none',
  },
  filterButtons: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  filterBtn: {
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    color: theme.colors.text2,
    borderRadius: theme.radius,
    padding: '10px 12px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    borderColor: theme.colors.gold,
    fontWeight: 600,
  },
  resultCount: {
    fontSize: '12px',
    color: theme.colors.text3,
    paddingTop: '8px',
    borderTop: `1px solid ${theme.colors.border}`,
  },
  mainPanel: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radiusLg,
    padding: '24px',
  },
  panelHeader: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${theme.colors.border}`,
  },
  panelTitle: {
    fontSize: '20px',
    fontWeight: 600,
    margin: 0,
  },
  loadingContainer: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `3px solid ${theme.colors.border2}`,
    borderTopColor: theme.colors.gold,
    animation: 'spin 0.8s linear infinite',
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '60px 20px',
    color: theme.colors.text3,
  },
  seedBtn: {
    width: '100%',
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '10px 12px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    marginTop: '12px',
    transition: 'all 0.2s',
  },
  settingsBtn: {
    width: '100%',
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    border: `1px solid #3b82f6`,
    borderRadius: theme.radius,
    padding: '10px 12px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    marginTop: '8px',
    transition: 'all 0.2s',
  },
  settingsBtnActive: {
    background: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6',
  },
};
