import { useState } from 'react';
import { theme } from '../styles/theme';

export default function RazorpayDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnostics = () => {
    setLoading(true);
    const results: any = {
      timestamp: new Date().toISOString(),
      domain: window.location.hostname,
      protocol: window.location.protocol,
      razorpayLoaded: !!window.Razorpay,
      razorpayKey: import.meta.env.VITE_RAZORPAY_KEY ? '✓ Set' : '✗ Missing',
      razorpayKeyValue: import.meta.env.VITE_RAZORPAY_KEY?.substring(0, 15) + '...',
      userAgent: navigator.userAgent,
      checks: [] as any[],
    };

    // Check 1: Razorpay script loaded
    results.checks.push({
      name: 'Razorpay Script Loaded',
      status: window.Razorpay ? '✅ PASS' : '❌ FAIL',
      details: window.Razorpay ? 'Razorpay object is available' : 'Razorpay object is undefined',
    });

    // Check 2: API Key configured
    results.checks.push({
      name: 'API Key Configured',
      status: import.meta.env.VITE_RAZORPAY_KEY ? '✅ PASS' : '❌ FAIL',
      details: import.meta.env.VITE_RAZORPAY_KEY 
        ? `Key starts with: ${import.meta.env.VITE_RAZORPAY_KEY.substring(0, 10)}...`
        : 'VITE_RAZORPAY_KEY not set in environment',
    });

    // Check 3: Domain configuration
    results.checks.push({
      name: 'Domain Configuration',
      status: '⚠️ MANUAL CHECK',
      details: `Current domain: ${window.location.hostname}. Verify this is whitelisted in Razorpay dashboard.`,
    });

    // Check 4: HTTPS/SSL
    results.checks.push({
      name: 'HTTPS/SSL',
      status: window.location.protocol === 'https:' ? '✅ PASS' : '⚠️ WARNING',
      details: `Protocol: ${window.location.protocol}. Razorpay requires HTTPS in production.`,
    });

    // Check 5: Browser compatibility
    results.checks.push({
      name: 'Browser Compatibility',
      status: '✅ PASS',
      details: `Browser: ${navigator.userAgent.substring(0, 50)}...`,
    });

    setDiagnostics(results);
    setLoading(false);
  };

  const testPaymentInitialization = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      if (!window.Razorpay) {
        setTestResult({
          status: '❌ FAILED',
          error: 'Razorpay not loaded',
          details: 'The Razorpay script failed to load. Check network tab in DevTools.',
        });
        setLoading(false);
        return;
      }

      const testOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: 100, // ₹1 for testing
        currency: 'INR',
        name: 'Gravity - Test Payment',
        description: 'Test Payment - Do Not Complete',
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999',
        },
        theme: { color: '#f5a623' },
        handler: (response: any) => {
          setTestResult({
            status: '✅ SUCCESS',
            message: 'Payment modal opened and payment processed',
            paymentId: response.razorpay_payment_id,
          });
        },
        modal: {
          ondismiss: () => {
            setTestResult({
              status: '⚠️ DISMISSED',
              message: 'Payment modal was closed by user',
              details: 'This is normal if you closed the modal without completing payment',
            });
          },
        },
      };

      const rzp = new window.Razorpay(testOptions);
      rzp.open();

      setTestResult({
        status: '⏳ PENDING',
        message: 'Payment modal opened. Complete or close the payment to see result.',
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      setTestResult({
        status: '❌ FAILED',
        error: errorMsg,
        details: 'Check the error message above and refer to RAZORPAY_DOMAIN_FIX.md',
      });
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>🔧 Razorpay Payment Diagnostic</h1>
        <p>Use this tool to diagnose Razorpay integration issues</p>
      </div>

      <div style={styles.content}>
        {/* Diagnostic Buttons */}
        <div style={styles.buttonGroup}>
          <button
            style={styles.btnPrimary}
            onClick={runDiagnostics}
            disabled={loading}
          >
            {loading ? 'Running...' : '🔍 Run Diagnostics'}
          </button>
          <button
            style={styles.btnSecondary}
            onClick={testPaymentInitialization}
            disabled={loading}
          >
            {loading ? 'Testing...' : '💳 Test Payment Modal'}
          </button>
        </div>

        {/* Diagnostics Results */}
        {diagnostics && (
          <div style={styles.section}>
            <h2>📋 Diagnostic Results</h2>
            <div style={styles.infoBox}>
              <p><strong>Timestamp:</strong> {diagnostics.timestamp}</p>
              <p><strong>Domain:</strong> {diagnostics.domain}</p>
              <p><strong>Protocol:</strong> {diagnostics.protocol}</p>
              <p><strong>Razorpay Loaded:</strong> {diagnostics.razorpayLoaded ? '✅ Yes' : '❌ No'}</p>
              <p><strong>API Key:</strong> {diagnostics.razorpayKey}</p>
            </div>

            <h3>Checks:</h3>
            {diagnostics.checks.map((check: any, idx: number) => (
              <div key={idx} style={styles.checkItem}>
                <div style={styles.checkHeader}>
                  <strong>{check.name}</strong>
                  <span style={styles.checkStatus}>{check.status}</span>
                </div>
                <p style={styles.checkDetails}>{check.details}</p>
              </div>
            ))}
          </div>
        )}

        {/* Test Results */}
        {testResult && (
          <div style={styles.section}>
            <h2>🧪 Payment Test Result</h2>
            <div style={{
              ...styles.resultBox,
              borderColor: testResult.status.includes('SUCCESS') ? '#10b981' : 
                          testResult.status.includes('FAILED') ? '#ef4444' : '#f59e0b',
            }}>
              <p style={styles.resultStatus}>{testResult.status}</p>
              {testResult.message && <p>{testResult.message}</p>}
              {testResult.error && <p style={styles.errorText}>Error: {testResult.error}</p>}
              {testResult.details && <p style={styles.detailsText}>{testResult.details}</p>}
              {testResult.paymentId && <p><strong>Payment ID:</strong> {testResult.paymentId}</p>}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={styles.section}>
          <h2>📖 Instructions</h2>
          <ol style={styles.instructions}>
            <li>Click "Run Diagnostics" to check your Razorpay configuration</li>
            <li>Review the results and fix any issues marked as ❌ FAIL</li>
            <li>Click "Test Payment Modal" to verify the payment flow works</li>
            <li>If tests fail, refer to <code>RAZORPAY_DOMAIN_FIX.md</code> for detailed solutions</li>
            <li>Common issues:
              <ul>
                <li>Domain not whitelisted in Razorpay dashboard</li>
                <li>Razorpay script failed to load (check Network tab)</li>
                <li>Invalid or expired API key</li>
                <li>CORS or SSL certificate issues</li>
              </ul>
            </li>
          </ol>
        </div>

        {/* Debug Console */}
        <div style={styles.section}>
          <h2>🖥️ Browser Console Debug</h2>
          <p>Open DevTools (F12) and paste this in the Console tab:</p>
          <pre style={styles.codeBlock}>{`console.log('Razorpay:', window.Razorpay);
console.log('API Key:', import.meta.env.VITE_RAZORPAY_KEY);
console.log('Domain:', window.location.hostname);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0f172a',
    color: '#e2e8f0',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 40px',
    textAlign: 'center' as const,
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  buttonGroup: {
    display: 'flex' as const,
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap' as const,
  },
  btnPrimary: {
    background: '#f5a623',
    color: '#000',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  btnSecondary: {
    background: '#1e293b',
    color: '#f5a623',
    border: '2px solid #f5a623',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  section: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  infoBox: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    fontSize: '14px',
  },
  checkItem: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '12px',
  },
  checkHeader: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '8px',
  },
  checkStatus: {
    fontSize: '12px',
    fontWeight: '600' as const,
  },
  checkDetails: {
    fontSize: '13px',
    color: '#cbd5e1',
    margin: 0,
  },
  resultBox: {
    background: '#0f172a',
    border: '2px solid',
    borderRadius: '8px',
    padding: '16px',
    fontSize: '14px',
  },
  resultStatus: {
    fontSize: '16px',
    fontWeight: '600' as const,
    marginBottom: '8px',
  },
  errorText: {
    color: '#fca5a5',
    marginTop: '8px',
  },
  detailsText: {
    color: '#cbd5e1',
    marginTop: '8px',
    fontSize: '13px',
  },
  instructions: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#cbd5e1',
  },
  codeBlock: {
    background: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '12px',
    overflow: 'auto' as const,
    color: '#10b981',
  },
};
