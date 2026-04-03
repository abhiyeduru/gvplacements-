import { useState } from 'react';
import { theme } from '../../styles/theme';

interface Step3Props {
  data: any;
  paymentAmount?: number;
  onPrev: () => void;
  onPayment: (termsAccepted: boolean) => void;
}

export default function Step3({ data, paymentAmount = 1000, onPrev, onPayment }: Step3Props) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePayment = () => {
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    onPayment(termsAccepted);
  };

  return (
    <div>
      <div style={styles.stepIndicator}>Step <span style={{ color: theme.colors.gold, fontWeight: 600 }}>3</span> of 3</div>

      <div style={styles.reviewGrid}>
        <ReviewItem label="Full Name" value={data.name} />
        <ReviewItem label="Father's Name" value={data.fatherName} />
        <ReviewItem label="Phone" value={data.phone} />
        <ReviewItem label="Email" value={data.email} />
        <ReviewItem label="PAN" value={data.pan} />
        <ReviewItem label="Aadhar" value={data.aadhar} />
        <ReviewItem label="Date of Birth" value={data.dob} />
        <ReviewItem label="Gender" value={data.gender} />
        <ReviewItem label="Qualification" value={data.qualification} />
        <ReviewItem label="Experience" value={data.experience} />
        <ReviewItem label="Position" value={data.position} full />
        <ReviewItem label="Current Address" value={data.currentAddress} full />
        {data.permanentAddress && (
          <ReviewItem label="Permanent Address" value={data.permanentAddress} full />
        )}
      </div>

      <div style={styles.paymentSummary}>
        <div style={styles.psRow}>
          <span>Registration Fee</span>
          <span>₹{paymentAmount.toLocaleString()}</span>
        </div>
        <div style={styles.psRow}>
          <span>Processing (included)</span>
          <span>₹0</span>
        </div>
        <div style={styles.psTotal}>
          <span>Total Payable</span>
          <span>₹{paymentAmount.toLocaleString()}</span>
        </div>
      </div>

      <label style={styles.termsCheck}>
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          style={styles.checkbox}
        />
        <span style={styles.termsLabel}>
          I agree to the Terms & Conditions. I understand the ₹1000 fee is non-refundable and placement is not guaranteed.
        </span>
      </label>

      <div style={styles.formNav}>
        <button style={styles.btnBack} onClick={onPrev}>← Back</button>
        <button style={styles.btnNext} onClick={handlePayment}>Pay ₹{paymentAmount.toLocaleString()} via Razorpay 🔒</button>
      </div>
    </div>
  );
}

function ReviewItem({ label, value, full }: any) {
  return (
    <div style={{ ...styles.reviewItem, ...(full && { gridColumn: '1 / -1' }) }}>
      <div style={styles.rvLabel}>{label}</div>
      <div style={styles.rvVal}>{value || '—'}</div>
    </div>
  );
}

const styles = {
  stepIndicator: {
    fontSize: '13px',
    color: theme.colors.text3,
    marginBottom: '20px',
  },
  reviewGrid: {
    display: 'grid' as const,
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '20px',
  },
  reviewItem: {
    background: theme.colors.bg3,
    borderRadius: '8px',
    padding: '12px 14px',
  },
  rvLabel: {
    fontSize: '11px',
    color: theme.colors.text3,
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  rvVal: {
    fontSize: '14px',
    color: theme.colors.text,
    fontWeight: 500,
    wordBreak: 'break-word' as const,
  },
  paymentSummary: {
    background: theme.colors.goldDim,
    border: `1px solid ${theme.colors.goldBorder}`,
    borderRadius: theme.radius,
    padding: '18px 20px',
    marginBottom: '20px',
  },
  psRow: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    fontSize: '14px',
    color: theme.colors.text2,
    padding: '4px 0',
  },
  psTotal: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    borderTop: `1px solid ${theme.colors.goldBorder}`,
    marginTop: '10px',
    paddingTop: '10px',
    fontWeight: 700,
    fontSize: '18px',
    color: theme.colors.gold,
  },
  termsCheck: {
    display: 'flex' as const,
    alignItems: 'flex-start' as const,
    gap: '12px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    flexShrink: 0,
    marginTop: '2px',
    cursor: 'pointer',
    accentColor: theme.colors.gold,
  },
  termsLabel: {
    fontSize: '14px',
    color: theme.colors.text2,
    lineHeight: '1.6',
  },
  formNav: {
    display: 'flex' as const,
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: `1px solid ${theme.colors.border}`,
  },
  btnBack: {
    background: 'transparent',
    border: `1px solid ${theme.colors.border2}`,
    color: theme.colors.text2,
    borderRadius: theme.radius,
    padding: '12px 24px',
    fontSize: '15px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
  },
  btnNext: {
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
};
