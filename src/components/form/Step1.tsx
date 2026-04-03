import { useState } from 'react';
import { theme } from '../../styles/theme';

interface Step1Props {
  data: any;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

export default function Step1({ data, onChange, onNext }: Step1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.name || data.name.length < 2) newErrors.name = 'Full name required';
    if (!data.fatherName || data.fatherName.length < 2) newErrors.fatherName = 'Father\'s name required';
    if (!/^[6-9]\d{9}$/.test((data.phone || '').replace(/\D/g, ''))) newErrors.phone = 'Valid 10-digit phone required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) newErrors.email = 'Valid email required';
    if (!data.position) newErrors.position = 'Please select a position';
    if (!data.pan || data.pan.length < 10) newErrors.pan = 'Valid PAN required (10 characters)';
    if (!data.aadhar || data.aadhar.length < 12) newErrors.aadhar = 'Valid Aadhar required (12 digits)';
    if (!data.dob) newErrors.dob = 'Date of birth required';
    if (!data.gender) newErrors.gender = 'Please select gender';
    if (!data.qualification) newErrors.qualification = 'Please select qualification';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <div style={styles.stepIndicator}>Step <span style={{ color: theme.colors.gold, fontWeight: 600 }}>1</span> of 3</div>
      
      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Your full name"
            style={styles.input}
          />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Father's Name</label>
          <input
            type="text"
            value={data.fatherName || ''}
            onChange={(e) => onChange('fatherName', e.target.value)}
            placeholder="Father's full name"
            style={styles.input}
          />
          {errors.fatherName && <div style={styles.error}>{errors.fatherName}</div>}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+91 98765 43210"
            style={styles.input}
          />
          {errors.phone && <div style={styles.error}>{errors.phone}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="you@email.com"
            style={styles.input}
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>PAN Card</label>
          <input
            type="text"
            value={data.pan || ''}
            onChange={(e) => onChange('pan', e.target.value.toUpperCase())}
            placeholder="AAAPA1234A"
            style={styles.input}
          />
          {errors.pan && <div style={styles.error}>{errors.pan}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Aadhar Number</label>
          <input
            type="text"
            value={data.aadhar || ''}
            onChange={(e) => onChange('aadhar', e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="1234 5678 9012"
            style={styles.input}
          />
          {errors.aadhar && <div style={styles.error}>{errors.aadhar}</div>}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input
            type="date"
            value={data.dob || ''}
            onChange={(e) => onChange('dob', e.target.value)}
            style={styles.input}
          />
          {errors.dob && <div style={styles.error}>{errors.dob}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gender</label>
          <select
            value={data.gender || ''}
            onChange={(e) => onChange('gender', e.target.value)}
            style={styles.select}
          >
            <option value="">Select gender...</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <div style={styles.error}>{errors.gender}</div>}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Qualification</label>
          <select
            value={data.qualification || ''}
            onChange={(e) => onChange('qualification', e.target.value)}
            style={styles.select}
          >
            <option value="">Select qualification...</option>
            <option>10th Pass</option>
            <option>12th Pass</option>
            <option>Diploma</option>
            <option>Bachelor's Degree</option>
            <option>Master's Degree</option>
            <option>PhD</option>
          </select>
          {errors.qualification && <div style={styles.error}>{errors.qualification}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Years of Experience</label>
          <select
            value={data.experience || ''}
            onChange={(e) => onChange('experience', e.target.value)}
            style={styles.select}
          >
            <option value="">Select experience...</option>
            <option>Fresher</option>
            <option>0-1 years</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5-10 years</option>
            <option>10+ years</option>
          </select>
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Desired Job Position</label>
          <input
            type="text"
            value={data.position || ''}
            onChange={(e) => onChange('position', e.target.value)}
            placeholder="e.g., Software Engineer, Data Analyst, Marketing Manager..."
            style={styles.input}
          />
          {errors.position && <div style={styles.error}>{errors.position}</div>}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Referral Name (Optional)</label>
          <input
            type="text"
            value={data.referralName || ''}
            onChange={(e) => onChange('referralName', e.target.value)}
            placeholder="Who referred you?"
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.formNav}>
        <button style={styles.btnNext} onClick={handleNext}>Next: Address →</button>
      </div>
    </div>
  );
}

const styles = {
  stepIndicator: {
    fontSize: '13px',
    color: theme.colors.text3,
    marginBottom: '20px',
  },
  formRow: {
    display: 'grid' as const,
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
    marginBottom: '18px',
  },
  formGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block' as const,
    fontSize: '13px',
    color: theme.colors.text2,
    marginBottom: '8px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    color: theme.colors.text,
    fontSize: '15px',
    padding: '13px 16px',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
  },
  select: {
    width: '100%',
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    color: theme.colors.text,
    fontSize: '15px',
    padding: '13px 16px',
    fontFamily: 'Poppins, sans-serif',
    cursor: 'pointer',
  },
  error: {
    fontSize: '12px',
    color: theme.colors.red,
    marginTop: '5px',
  },
  formNav: {
    display: 'flex' as const,
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: `1px solid ${theme.colors.border}`,
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
