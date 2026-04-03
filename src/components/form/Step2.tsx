import { useState } from 'react';
import { theme } from '../../styles/theme';

interface Step2Props {
  data: any;
  files: { resume?: File; pan?: File };
  onChange: (field: string, value: string) => void;
  onFileChange: (type: 'resume' | 'pan', file: File | null) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step2({ data, files, onChange, onFileChange, onNext, onPrev }: Step2Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.currentAddress || data.currentAddress.length < 5) {
      newErrors.currentAddress = 'Current address required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div>
      <div style={styles.stepIndicator}>Step <span style={{ color: theme.colors.gold, fontWeight: 600 }}>2</span> of 3</div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Current Address</label>
        <textarea
          value={data.currentAddress || ''}
          onChange={(e) => onChange('currentAddress', e.target.value)}
          placeholder="House no, Street, City, State, PIN"
          style={styles.textarea}
        />
        {errors.currentAddress && <div style={styles.error}>{errors.currentAddress}</div>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Permanent Address <span style={styles.optional}>(leave blank if same as above)</span></label>
        <textarea
          value={data.permanentAddress || ''}
          onChange={(e) => onChange('permanentAddress', e.target.value)}
          placeholder="House no, Street, City, State, PIN"
          style={styles.textarea}
        />
      </div>

      <FileUpload
        label="Upload Resume"
        icon="📄"
        accept=".pdf,.doc,.docx"
        file={files.resume}
        onChange={(file) => onFileChange('resume', file)}
      />

      <FileUpload
        label="PAN Card"
        icon="🪪"
        accept=".pdf,.jpg,.jpeg,.png"
        file={files.pan}
        onChange={(file) => onFileChange('pan', file)}
      />

      <div style={styles.formGroup}>
        <label style={styles.label}>Additional Notes <span style={styles.optional}>(optional)</span></label>
        <textarea
          value={data.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Skills, preferred shift, salary expectations..."
          style={styles.textarea}
        />
      </div>

      <div style={styles.formNav}>
        <button style={styles.btnBack} onClick={onPrev}>← Back</button>
        <button style={styles.btnNext} onClick={handleNext}>Review & Pay →</button>
      </div>
    </div>
  );
}

function FileUpload({ label, icon, accept, file, onChange }: any) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{label} <span style={styles.optional}>(optional)</span></label>
      <label style={styles.fileUpload}>
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          style={{ display: 'none' }}
        />
        <div style={styles.uploadIcon}>{icon}</div>
        <p>Click to upload {label.toLowerCase()}</p>
        {file && <p style={styles.fileName}>📎 {file.name}</p>}
      </label>
    </div>
  );
}

const styles = {
  stepIndicator: {
    fontSize: '13px',
    color: theme.colors.text3,
    marginBottom: '20px',
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
  optional: {
    color: theme.colors.text3,
    fontWeight: 400,
    fontSize: '12px',
  },
  textarea: {
    width: '100%',
    background: theme.colors.bg3,
    border: `1px solid ${theme.colors.border2}`,
    borderRadius: theme.radius,
    color: theme.colors.text,
    fontSize: '15px',
    padding: '13px 16px',
    fontFamily: 'Poppins, sans-serif',
    minHeight: '90px',
    resize: 'vertical' as const,
  },
  fileUpload: {
    border: `1.5px dashed ${theme.colors.border2}`,
    borderRadius: theme.radius,
    padding: '20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    background: theme.colors.bg3,
    display: 'block',
  },
  uploadIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  fileName: {
    color: theme.colors.gold,
    fontSize: '13px',
    marginTop: '8px',
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
