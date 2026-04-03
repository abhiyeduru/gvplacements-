import jsPDF from 'jspdf';
import { CandidateData } from '../types';

export const generateCandidatePDF = (candidate: CandidateData, docId: string): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFontSize(24);
  doc.setTextColor(245, 166, 35); // Gold color
  doc.text('GRAVITY', 20, yPosition);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Job Assistance Platform', 20, yPosition + 8);

  yPosition += 20;

  // Confirmation ID
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Registration Confirmation', 20, yPosition);
  yPosition += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Confirmation ID: ${docId.toUpperCase()}`, 20, yPosition);
  yPosition += 10;

  // Personal Information Section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Personal Information', 20, yPosition);
  yPosition += 8;

  const personalInfo = [
    ['Full Name', candidate.name],
    ['Father\'s Name', candidate.fatherName],
    ['Email', candidate.email],
    ['Phone', candidate.phone],
    ['Date of Birth', candidate.dob],
    ['Gender', candidate.gender],
  ];

  doc.setFontSize(9);
  personalInfo.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(`${label}:`, 20, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.text(String(value || '—'), 80, yPosition);
    yPosition += 6;
  });

  yPosition += 4;

  // Identity Information Section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Identity Information', 20, yPosition);
  yPosition += 8;

  const identityInfo = [
    ['PAN Card', candidate.pan],
    ['Aadhar Number', candidate.aadhar],
  ];

  doc.setFontSize(9);
  identityInfo.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(`${label}:`, 20, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.text(String(value || '—'), 80, yPosition);
    yPosition += 6;
  });

  yPosition += 4;

  // Professional Information Section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Professional Information', 20, yPosition);
  yPosition += 8;

  const professionalInfo = [
    ['Desired Position', candidate.position],
    ['Qualification', candidate.qualification],
    ['Experience', candidate.experience],
  ];

  doc.setFontSize(9);
  professionalInfo.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(`${label}:`, 20, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.text(String(value || '—'), 80, yPosition);
    yPosition += 6;
  });

  yPosition += 4;

  // Address Information Section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Address Information', 20, yPosition);
  yPosition += 8;

  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Current Address:', 20, yPosition);
  yPosition += 4;
  doc.setTextColor(0, 0, 0);
  const currentAddressLines = doc.splitTextToSize(candidate.currentAddress || '—', 160);
  doc.text(currentAddressLines, 20, yPosition);
  yPosition += currentAddressLines.length * 4 + 4;

  if (candidate.permanentAddress) {
    doc.setTextColor(100, 100, 100);
    doc.text('Permanent Address:', 20, yPosition);
    yPosition += 4;
    doc.setTextColor(0, 0, 0);
    const permanentAddressLines = doc.splitTextToSize(candidate.permanentAddress, 160);
    doc.text(permanentAddressLines, 20, yPosition);
    yPosition += permanentAddressLines.length * 4 + 4;
  }

  yPosition += 4;

  // Payment Information Section
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Payment Information', 20, yPosition);
  yPosition += 8;

  const paymentInfo = [
    ['Registration Fee', `₹${candidate.paymentAmount}`],
    ['Payment Status', candidate.paymentStatus.toUpperCase()],
    ['Payment ID', candidate.paymentId || 'N/A'],
  ];

  doc.setFontSize(9);
  paymentInfo.forEach(([label, value]) => {
    doc.setTextColor(100, 100, 100);
    doc.text(`${label}:`, 20, yPosition);
    doc.setTextColor(0, 0, 0);
    doc.text(String(value), 80, yPosition);
    yPosition += 6;
  });

  yPosition += 8;

  // Registration Date
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  const registrationDate = new Date(candidate.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Registration Date: ${registrationDate}`, 20, yPosition);

  // Footer
  yPosition = pageHeight - 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('This is an automated confirmation. Please keep this document for your records.', 20, yPosition);
  doc.text('For queries, contact: support@gravity.com | WhatsApp: +91-XXXXXXXXXX', 20, yPosition + 5);

  // Save PDF
  const fileName = `Gravity_Registration_${docId.toUpperCase()}.pdf`;
  doc.save(fileName);
};

export const downloadPDF = (candidate: CandidateData, docId: string): void => {
  generateCandidatePDF(candidate, docId);
};
