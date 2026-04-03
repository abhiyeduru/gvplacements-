import { useState, useEffect } from 'react';
import { CandidateData } from '../types';
import { theme } from '../styles/theme';
import { downloadPDF } from '../services/pdfService';
import { sendRegistrationNotifications } from '../services/notificationService';
import { receiptService, ReceiptData } from '../services/receiptService';
import { logoService } from '../services/logoService';

interface SuccessScreenProps {
  id: string;
  candidate: CandidateData;
  onClose: () => void;
}

export default function SuccessScreen({ id, candidate, onClose }: SuccessScreenProps) {
  const [notificationStatus, setNotificationStatus] = useState<{
    email: boolean | null;
    whatsapp: boolean | null;
  }>({ email: null, whatsapp: null });
  const [sending, setSending] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptHTML, setReceiptHTML] = useState('');
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [receiptMode, setReceiptMode] = useState<'auto' | 'manual' | null>(null);

  useEffect(() => {
    const sendNotifications = async () => {
      setSending(true);
      const result = await sendRegistrationNotifications(candidate, id);
      setNotificationStatus(result);
      setSending(false);
      
      // Auto-generate receipt after notifications are sent
      setTimeout(() => {
        generateReceipt('auto');
      }, 1000);
    };

    sendNotifications();
  }, [candidate, id]);

  const generateReceipt = (mode: 'auto' | 'manual') => {
    try {
      const logoUrl = logoService.getLogoUrl() || undefined;
      const receiptData: ReceiptData = {
        candidateId: id,
        candidateName: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        amount: candidate.paymentAmount,
        paymentId: candidate.paymentId || 'N/A',
        paymentDate: candidate.paymentDate || new Date().toISOString(),
        position: candidate.position,
        pan: candidate.pan,
        aadhar: candidate.aadhar,
      };
      const html = receiptService.displayReceiptPreview(receiptData, logoUrl);
      setReceiptHTML(html);
      setReceiptGenerated(true);
      setReceiptMode(mode);
      
      if (mode === 'auto') {
        setShowReceipt(true);
      }
    } catch (error) {
      console.error('Error generating receipt:', error);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF(candidate, id);
  };

  const handleDownloadReceipt = async () => {
    try {
      const logoUrl = logoService.getLogoUrl() || undefined;
      const receiptData: ReceiptData = {
        candidateId: id,
        candidateName: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        amount: candidate.paymentAmount,
        paymentId: candidate.paymentId || 'N/A',
        paymentDate: candidate.paymentDate || new Date().toISOString(),
        position: candidate.position,
        pan: candidate.pan,
        aadhar: candidate.aadhar,
      };
      await receiptService.downloadReceiptPDF(receiptData, logoUrl);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      alert('Failed to download receipt');
    }
  };

  const handleViewReceipt = () => {
    generateReceipt('manual');
    setShowReceipt(true);
  };

  return (
    <div style={styles.container}>
      {showReceipt ? (
        <div style={styles.receiptModal}>
          <div style={styles.receiptHeader}>
            <h2 style={styles.receiptTitle}>Payment Receipt</h2>
            <button
              style={styles.closeReceiptBtn}
              onClick={() => setShowReceipt(false)}
            >
              ✕
            </button>
          </div>
          <div
            style={styles.receiptContent}
            dangerouslySetInnerHTML={{ __html: receiptHTML }}
          />
          <div style={styles.receiptActions}>
            <button
              style={styles.downloadReceiptBtn}
              onClick={handleDownloadReceipt}
            >
              📥 Download Receipt PDF
            </button>
            <button
              style={styles.closeReceiptActionBtn}
              onClick={() => setShowReceipt(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={styles.icon}>✓</div>
          <h2 style={styles.title}>Registration Successful!</h2>
          <p style={styles.subtitle}>Welcome to Gravity. Your profile has been created and our team will be in touch shortly.</p>
          
          <div style={styles.confirmationId}>ID: {id.toUpperCase()}</div>
          
          <div style={styles.notifList}>
            <div style={styles.notifBadge}>
              <div style={styles.dot} /> Registration Complete
            </div>
            <div style={{
              ...styles.notifBadge,
              background: notificationStatus.email === true ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              color: notificationStatus.email === true ? '#22c55e' : '#ef4444',
            }}>
              <div style={{
                ...styles.dot,
                background: notificationStatus.email === true ? '#22c55e' : '#ef4444',
              }} />
              {sending ? 'Sending Email...' : (notificationStatus.email ? 'Email Sent' : 'Email Failed')}
            </div>
            <div style={{
              ...styles.notifBadge,
              background: notificationStatus.whatsapp === true ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
              color: notificationStatus.whatsapp === true ? '#22c55e' : '#ef4444',
            }}>
              <div style={{
                ...styles.dot,
                background: notificationStatus.whatsapp === true ? '#22c55e' : '#ef4444',
              }} />
              {sending ? 'Sending WhatsApp...' : (notificationStatus.whatsapp ? 'WhatsApp Sent' : 'WhatsApp Failed')}
            </div>
          </div>

          {/* Receipt Status */}
          {receiptGenerated && (
            <div style={styles.receiptStatus}>
              <div style={styles.receiptStatusIcon}>📄</div>
              <p style={styles.receiptStatusText}>
                Receipt {receiptMode === 'auto' ? 'auto-generated' : 'generated'} successfully
              </p>
            </div>
          )}

          <p style={styles.footer}>Expect a call within 48 hours. For queries, WhatsApp us directly.</p>
          
          <div style={styles.actions}>
            <button style={styles.downloadBtn} onClick={handleDownloadPDF}>
              📥 Download Certificate
            </button>
            {receiptGenerated && (
              <button style={styles.receiptBtn} onClick={handleViewReceipt}>
                🧾 View Receipt
              </button>
            )}
            <button style={styles.closeBtn} onClick={onClose}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '40px 28px',
  },
  icon: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'rgba(34,197,94,0.15)',
    border: '2px solid rgba(34,197,94,0.4)',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    fontSize: '32px',
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '26px',
    fontWeight: 700,
    marginBottom: '10px',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: '15px',
    color: theme.colors.text2,
    marginBottom: '8px',
    lineHeight: '1.6',
  },
  confirmationId: {
    display: 'inline-block',
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: '8px',
    padding: '10px 20px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: theme.colors.gold,
    margin: '16px 0',
  },
  notifList: {
    display: 'flex' as const,
    gap: '10px',
    justifyContent: 'center',
    margin: '20px 0',
    flexWrap: 'wrap' as const,
  },
  notifBadge: {
    display: 'flex' as const,
    alignItems: 'center',
    gap: '6px',
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: '50px',
    padding: '7px 14px',
    fontSize: '13px',
    color: theme.colors.text2,
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: theme.colors.green,
  },
  receiptStatus: {
    background: 'rgba(34, 197, 94, 0.1)',
    border: `1px solid rgba(34, 197, 94, 0.3)`,
    borderRadius: '8px',
    padding: '12px 16px',
    margin: '16px 0',
    display: 'flex' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  receiptStatusIcon: {
    fontSize: '18px',
  },
  receiptStatusText: {
    fontSize: '13px',
    color: '#22c55e',
    margin: 0,
    fontWeight: 500,
  },
  footer: {
    fontSize: '13px',
    color: theme.colors.text3,
  },
  actions: {
    display: 'flex' as const,
    gap: '12px',
    justifyContent: 'center',
    margin: '24px auto 0',
    flexWrap: 'wrap' as const,
  },
  downloadBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  receiptBtn: {
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    border: `1px solid #3b82f6`,
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  closeBtn: {
    background: 'transparent',
    border: `1px solid ${theme.colors.border2}`,
    color: theme.colors.text2,
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  receiptModal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    zIndex: 1000,
  },
  receiptHeader: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: theme.colors.bg2,
    borderBottom: `1px solid ${theme.colors.border2}`,
  },
  receiptTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: theme.colors.text,
    margin: 0,
  },
  closeReceiptBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme.colors.text2,
  },
  receiptContent: {
    flex: 1,
    overflow: 'auto',
    background: '#f5f5f5',
    padding: '20px',
  },
  receiptActions: {
    display: 'flex' as const,
    gap: '12px',
    padding: '20px',
    background: theme.colors.bg2,
    borderTop: `1px solid ${theme.colors.border2}`,
    justifyContent: 'center',
  },
  downloadReceiptBtn: {
    background: theme.colors.gold,
    color: '#0a0a0f',
    border: 'none',
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  closeReceiptActionBtn: {
    background: 'transparent',
    border: `1px solid ${theme.colors.border2}`,
    color: theme.colors.text2,
    borderRadius: theme.radius,
    padding: '12px 28px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
};
