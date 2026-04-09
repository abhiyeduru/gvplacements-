import { useState } from 'react';
import { theme } from '../styles/theme';

export default function RazorpayTest() {
  const [testAmount, setTestAmount] = useState(1);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPhone, setTestPhone] = useState('9999999999');
  const [testName, setTestName] = useState('Test User');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTestPayment = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Razorpay script not loaded');
      }

      const amountInPaise = testAmount * 100;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Gravity Test Payment',
        description: 'Test Payment for Razorpay Integration',
        prefill: {
          name: testName,
          email: testEmail,
          contact: testPhone,
        },
        theme: { color: '#f5a623' },
        handler: (response: any) => {
          setResult({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            message: '✅ Payment Successful!',
          });
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            setError('Payment cancelled by user');
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`❌ Error: ${errorMsg}`);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Razorpay Payment Test</h1>
        <p style={styles.subtitle}>Test the payment integration</p>
      </div>

      <div style={styles.content}>
        {/* Configuration Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Configuration</h2>
          <div style={styles.infoBox}>
            <div style={styles.infoRow}>
              <span style={styles.label}>Razorpay Key:</span>
              <span style={styles.value}>
                {import.meta.env.VITE_RAZORPAY_KEY ? '✅ Configured' : '❌ Missing'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Script Loaded:</span>
              <span style={styles.value}>
                {typeof window.Razorpay !== 'undefined' ? '✅ Yes' : '❌ No'}
              </span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Domain:</span>
              <span style={styles.value}>{window.location.hostname}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.label}>Protocol:</span>
              <span style={styles.value}>{window.location.protocol}</span>
            </div>
          </div>
        </div>

        {/* Test Form */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Test Payment Details</h2>
          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Amount (₹)</label>
              <input
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(Number(e.target.value))}
                style={styles.input}
                min="1"
                step="1"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Name</label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email</label>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone</label>
              <input
                type="tel"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                style={styles.input}
              />
            </div>

            <button
              onClick={handleTestPayment}
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Processing...' : `Test Payment ₹${testAmount}`}
            </button>
          </div>
        </div>

        {/* Test Card Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Test Card Details</h2>
          <div style={styles.testCardBox}>
            <p style={styles.testCardText}>
              <strong>Card Number:</strong> 4111 1111 1111 1111
            </p>
            <p style={styles.testCardText}>
              <strong>Expiry:</strong> Any future date (e.g., 12/25)
            </p>
            <p style={styles.testCardText}>
              <strong>CVV:</strong> Any 3 digits (e.g., 123)
            </p>
            <p style={styles.testCardText}>
              <strong>Name:</strong> Any name
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={styles.section}>
            <div style={styles.errorBox}>
              <h3 style={styles.errorTitle}>Error</h3>
              <p style={styles.errorText}>{error}</p>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div style={styles.section}>
            <div style={styles.successBox}>
              <h3 style={styles.successTitle}>{result.message}</h3>
              <div style={styles.resultDetails}>
                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Payment ID:</span>
                  <span style={styles.resultValue}>{result.paymentId}</span>
                </div>
                {result.orderId && (
                  <div style={styles.resultRow}>
                    <span style={styles.resultLabel}>Order ID:</span>
                    <span style={styles.resultValue}>{result.orderId}</span>
                  </div>
                )}
                {result.signature && (
                  <div style={styles.resultRow}>
                    <span style={styles.resultLabel}>Signature:</span>
                    <span style={{ ...styles.resultValue, fontSize: '12px', wordBreak: 'break-all' }}>
                      {result.signature}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Instructions</h2>
          <ol style={styles.instructions}>
            <li>Fill in the test payment details above</li>
            <li>Click "Test Payment" button</li>
            <li>Razorpay modal will open</li>
            <li>Use the test card details provided</li>
            <li>Complete the payment</li>
            <li>You'll see the payment ID and confirmation</li>
          </ol>
        </div>

        {/* Troubleshooting */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Troubleshooting</h2>
          <div style={styles.troubleBox}>
            <h4 style={styles.troubleTitle}>❌ "Razorpay script not loaded"</h4>
            <p style={styles.troubleText}>
              The Razorpay script failed to load. Check your internet connection and refresh the page.
            </p>

            <h4 style={styles.troubleTitle}>❌ "Payment blocked as website does not match"</h4>
            <p style={styles.troubleText}>
              Your domain is not registered in Razorpay. Go to Razorpay dashboard and add your domain.
            </p>

            <h4 style={styles.troubleTitle}>❌ "Invalid Razorpay key"</h4>
            <p style={styles.troubleText}>
              Check that VITE_RAZORPAY_KEY is set correctly in .env.local
            </p>

            <h4 style={styles.troubleTitle}>✅ Payment successful</h4>
            <p style={styles.troubleText}>
              Great! Your Razorpay integration is working correctly.
            </p>
          </div>
        </div>
      </div>
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
    maxWidth: '800px',
    margin: '0 auto 40px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: theme.colors.text,
    margin: '0 0 8px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  subtitle: {
    fontSize: '16px',
    color: theme.colors.text2,
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  section: {
    background: theme.colors.bg2,
    borderRadius: theme.radiusLg,
    padding: '24px',
    marginBottom: '24px',
    border: `1px solid ${theme.colors.border}`,
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: theme.colors.text,
    margin: '0 0 16px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  infoBox: {
    background: theme.colors.bg3,
    borderRadius: theme.radius,
    padding: '16px',
  },
  infoRow: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    padding: '8px 0',
    borderBottom: `1px solid ${theme.colors.border}`,
    fontSize: '14px',
  },
  label: {
    color: theme.colors.text2,
    fontWeight: 500,
  },
  value: {
    color: theme.colors.text,
    fontWeight: 600,
  },
  form: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '16px',
  },
  formGroup: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text,
    fontFamily: 'Poppins, sans-serif',
  },
  input: {
    padding: '12px 16px',
    borderRadius: theme.radius,
    border: `1px solid ${theme.colors.border}`,
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    background: theme.colors.bg,
    color: theme.colors.text,
  },
  button: {
    padding: '14px 24px',
    borderRadius: theme.radius,
    border: 'none',
    background: theme.colors.gold,
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    marginTop: '8px',
  },
  testCardBox: {
    background: theme.colors.bg3,
    borderRadius: theme.radius,
    padding: '16px',
    border: `2px solid ${theme.colors.gold}`,
  },
  testCardText: {
    fontSize: '14px',
    color: theme.colors.text,
    margin: '8px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  errorBox: {
    background: '#fee2e2',
    borderRadius: theme.radius,
    padding: '16px',
    border: `1px solid #fca5a5`,
  },
  errorTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#991b1b',
    margin: '0 0 8px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  errorText: {
    fontSize: '14px',
    color: '#7f1d1d',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  successBox: {
    background: '#dcfce7',
    borderRadius: theme.radius,
    padding: '16px',
    border: `1px solid #86efac`,
  },
  successTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#166534',
    margin: '0 0 12px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  resultDetails: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  resultRow: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '4px',
  },
  resultLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#166534',
    fontFamily: 'Poppins, sans-serif',
  },
  resultValue: {
    fontSize: '14px',
    color: '#15803d',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
  },
  instructions: {
    fontSize: '14px',
    color: theme.colors.text2,
    lineHeight: '1.8',
    paddingLeft: '20px',
    margin: 0,
    fontFamily: 'Poppins, sans-serif',
  },
  troubleBox: {
    background: theme.colors.bg3,
    borderRadius: theme.radius,
    padding: '16px',
  },
  troubleTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: theme.colors.text,
    margin: '12px 0 6px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  troubleText: {
    fontSize: '13px',
    color: theme.colors.text2,
    margin: '0 0 12px 0',
    lineHeight: '1.6',
    fontFamily: 'Poppins, sans-serif',
  },
};
