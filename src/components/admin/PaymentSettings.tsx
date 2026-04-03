import { useState, useEffect } from 'react';
import { paymentSettingsService, type PaymentSettings } from '../../services/paymentSettingsService';
import { logoService } from '../../services/logoService';
import { theme } from '../../styles/theme';

export default function PaymentSettings() {
  const [settings, setSettings] = useState<PaymentSettings | null>(null);
  const [newAmount, setNewAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
    loadLogo();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await paymentSettingsService.getSettings();
    if (data) {
      setSettings(data);
      console.log('✓ Settings loaded:', data);
    } else {
      // Initialize with default amounts
      const defaultSettings: PaymentSettings = {
        amounts: [1, 100, 500, 1000, 2000, 5000],
        selectedAmount: 2000,
        updatedAt: new Date().toISOString(),
      };
      setSettings(defaultSettings);
      await paymentSettingsService.updateSettings(defaultSettings);
      console.log('✓ Default settings created');
    }
    setLoading(false);
  };

  const loadLogo = () => {
    const url = logoService.getLogoUrl();
    setLogoUrl(url);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddAmount = async () => {
    if (!newAmount || isNaN(Number(newAmount)) || Number(newAmount) <= 0) {
      showMessage('error', 'Please enter a valid amount');
      return;
    }

    setSaving(true);
    const success = await paymentSettingsService.addAmount(Number(newAmount));
    if (success) {
      setNewAmount('');
      await loadSettings();
      showMessage('success', `₹${newAmount} added successfully`);
    } else {
      showMessage('error', 'Failed to add amount');
    }
    setSaving(false);
  };

  const handleRemoveAmount = async (amount: number) => {
    if (confirm(`Remove ₹${amount}?`)) {
      setSaving(true);
      const success = await paymentSettingsService.removeAmount(amount);
      if (success) {
        await loadSettings();
        showMessage('success', `₹${amount} removed successfully`);
      } else {
        showMessage('error', 'Failed to remove amount');
      }
      setSaving(false);
    }
  };

  const handleSelectAmount = async (amount: number) => {
    setSaving(true);
    const success = await paymentSettingsService.setSelectedAmount(amount);
    if (success) {
      await loadSettings();
      showMessage('success', `₹${amount} set as active amount`);
    } else {
      showMessage('error', 'Failed to update amount');
    }
    setSaving(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        logoService.setLogoUrl(url);
        setLogoUrl(url);
        showMessage('success', 'Logo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLogo = () => {
    logoService.clearLogoUrl();
    setLogoUrl(null);
  };

  if (loading) {
    return <div style={styles.container}>Loading settings...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💰 Payment Settings</h2>

      {/* Message Alert */}
      {message && (
        <div style={{
          ...styles.messageAlert,
          ...(message.type === 'success' ? styles.messageSuccess : styles.messageError),
        }}>
          {message.type === 'success' ? '✓' : '✕'} {message.text}
        </div>
      )}

      {/* Logo Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Company Logo</h3>
        <div style={styles.logoSection}>
          {logoUrl ? (
            <div style={styles.logoPreview}>
              <img src={logoUrl} alt="Company Logo" style={styles.logoImage} />
              <button
                style={styles.clearBtn}
                onClick={handleClearLogo}
                disabled={saving}
              >
                Remove Logo
              </button>
            </div>
          ) : (
            <div style={styles.logoUploadArea}>
              <p style={styles.uploadText}>No logo uploaded</p>
              <label style={styles.uploadLabel}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: 'none' }}
                />
                Upload Logo
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Payment Amounts Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Fixed Payment Amounts</h3>

        {/* Add New Amount */}
        <div style={styles.addAmountForm}>
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="Enter amount (e.g., 1000)"
            style={styles.input}
            min="1"
            disabled={saving}
          />
          <button
            style={styles.addBtn}
            onClick={handleAddAmount}
            disabled={saving}
          >
            {saving ? 'Adding...' : '+ Add Amount'}
          </button>
        </div>

        {/* Current Amounts */}
        <div style={styles.amountsList}>
          <p style={styles.amountsLabel}>Available Amounts:</p>
          <div style={styles.amountsGrid}>
            {settings?.amounts.map((amount) => (
              <div
                key={amount}
                style={{
                  ...styles.amountCard,
                  ...(settings.selectedAmount === amount
                    ? styles.amountCardSelected
                    : {}),
                }}
              >
                <div style={styles.amountValue}>₹{amount}</div>
                <div style={styles.amountActions}>
                  <button
                    style={styles.selectBtn}
                    onClick={() => handleSelectAmount(amount)}
                    disabled={saving}
                  >
                    {settings.selectedAmount === amount ? '✓ Selected' : 'Select'}
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleRemoveAmount(amount)}
                    disabled={saving}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Selected Amount */}
        <div style={styles.selectedInfo}>
          <p style={styles.selectedLabel}>Current Payment Amount:</p>
          <div style={styles.selectedAmount}>
            ₹{settings?.selectedAmount || 1}
          </div>
          <p style={styles.selectedNote}>
            This amount will be charged when candidates complete registration
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: theme.colors.bg2,
    borderRadius: theme.radius,
    padding: '24px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.colors.text,
    marginBottom: '24px',
    fontFamily: 'Poppins, sans-serif',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: '16px',
  },
  logoSection: {
    display: 'flex' as const,
    justifyContent: 'center',
  },
  logoPreview: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px',
  },
  logoImage: {
    maxWidth: '200px',
    maxHeight: '150px',
    borderRadius: theme.radius,
    border: `2px solid ${theme.colors.border2}`,
    padding: '8px',
  },
  logoUploadArea: {
    border: `2px dashed ${theme.colors.border2}`,
    borderRadius: theme.radius,
    padding: '32px',
    textAlign: 'center' as const,
    cursor: 'pointer',
  },
  uploadText: {
    color: theme.colors.text2,
    marginBottom: '12px',
  },
  uploadLabel: {
    display: 'inline-block',
    background: theme.colors.gold,
    color: '#0a0a0f',
    padding: '10px 20px',
    borderRadius: theme.radius,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
  },
  clearBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: `1px solid #ef4444`,
    borderRadius: theme.radius,
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
  },
  addAmountForm: {
    display: 'flex' as const,
    gap: '12px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    background: theme.colors.bg2,
    color: theme.colors.text,
  },
  addBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
  },
  amountsList: {
    marginBottom: '20px',
  },
  amountsLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text,
    marginBottom: '12px',
  },
  amountsGrid: {
    display: 'grid' as const,
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '20px',
  },
  amountCard: {
    background: theme.colors.bg2,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    padding: '16px',
    textAlign: 'center' as const,
  },
  amountCardSelected: {
    background: 'rgba(245, 158, 11, 0.1)',
    borderColor: theme.colors.gold,
    borderWidth: '2px',
  },
  amountValue: {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.colors.gold,
    marginBottom: '12px',
  },
  amountActions: {
    display: 'flex' as const,
    gap: '6px',
    justifyContent: 'center',
  },
  selectBtn: {
    flex: 1,
    background: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e',
    border: `1px solid #22c55e`,
    borderRadius: '4px',
    padding: '6px 8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
  },
  deleteBtn: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: `1px solid #ef4444`,
    borderRadius: '4px',
    padding: '6px 8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 600,
  },
  selectedInfo: {
    background: 'rgba(245, 158, 11, 0.1)',
    border: `1px solid ${theme.colors.gold}`,
    borderRadius: theme.radius,
    padding: '16px',
  },
  selectedLabel: {
    fontSize: '13px',
    color: theme.colors.text2,
    marginBottom: '8px',
  },
  selectedAmount: {
    fontSize: '32px',
    fontWeight: 700,
    color: theme.colors.gold,
    marginBottom: '8px',
  },
  selectedNote: {
    fontSize: '12px',
    color: theme.colors.text3,
  },
  messageAlert: {
    padding: '12px 16px',
    borderRadius: theme.radius,
    marginBottom: '16px',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex' as const,
    alignItems: 'center',
    gap: '8px',
  },
  messageSuccess: {
    background: 'rgba(34, 197, 94, 0.1)',
    color: '#22c55e',
    border: `1px solid rgba(34, 197, 94, 0.3)`,
  },
  messageError: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: `1px solid rgba(239, 68, 68, 0.3)`,
  },
};
