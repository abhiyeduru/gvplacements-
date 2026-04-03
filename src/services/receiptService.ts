// Receipt generation service
// Creates professional payment receipts with logo

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CandidateData } from '../types';
import { logoService } from './logoService';

export interface ReceiptData {
  candidateId: string;
  candidateName: string;
  email: string;
  phone: string;
  amount: number;
  paymentId: string;
  paymentDate: string;
  position: string;
  pan: string;
  aadhar: string;
}

export const receiptService = {
  // Generate receipt HTML
  generateReceiptHTML(data: ReceiptData, logoUrl?: string): string {
    const receiptDate = new Date(data.paymentDate).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const receiptNumber = `RCP-${data.candidateId.substring(0, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Arial', sans-serif; background: #f5f5f5; padding: 20px; }
          .receipt-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #1e3a8a;
            padding-bottom: 20px;
          }
          .logo-section {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          .logo-section img {
            max-width: 120px;
            height: auto;
          }
          .company-info h1 {
            color: #1e3a8a;
            font-size: 24px;
            margin-bottom: 5px;
          }
          .company-info p {
            color: #666;
            font-size: 13px;
          }
          .receipt-title {
            text-align: right;
          }
          .receipt-title h2 {
            color: #1e3a8a;
            font-size: 20px;
            margin-bottom: 5px;
          }
          .receipt-number {
            color: #f59e0b;
            font-weight: bold;
            font-size: 14px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            background: #f3f4f6;
            padding: 10px 15px;
            border-left: 4px solid #f59e0b;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 15px;
            font-size: 14px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 15px;
          }
          .info-item {
            display: flex;
            flex-direction: column;
          }
          .info-label {
            color: #666;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .info-value {
            color: #1e3a8a;
            font-size: 14px;
            font-weight: 500;
          }
          .amount-section {
            background: #f0f9ff;
            border: 2px solid #1e3a8a;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
          }
          .amount-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .amount-row.total {
            border-top: 2px solid #1e3a8a;
            padding-top: 10px;
            font-weight: bold;
            font-size: 18px;
            color: #1e3a8a;
          }
          .amount-label {
            color: #666;
          }
          .amount-value {
            color: #1e3a8a;
            font-weight: 600;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          .status-badge {
            display: inline-block;
            background: #dcfce7;
            color: #166534;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
          }
          .divider {
            height: 1px;
            background: #e5e7eb;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <!-- Header -->
          <div class="header">
            <div class="logo-section">
              ${logoUrl ? `<img src="${logoUrl}" alt="Company Logo">` : ''}
              <div class="company-info">
                <h1>GV Consultancy</h1>
                <p>Training and Placements</p>
              </div>
            </div>
            <div class="receipt-title">
              <h2>PAYMENT RECEIPT</h2>
              <div class="receipt-number">${receiptNumber}</div>
            </div>
          </div>

          <!-- Candidate Information -->
          <div class="section">
            <div class="section-title">Candidate Information</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Full Name</div>
                <div class="info-value">${data.candidateName}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${data.email}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Phone</div>
                <div class="info-value">${data.phone}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Position Applied</div>
                <div class="info-value">${data.position}</div>
              </div>
              <div class="info-item">
                <div class="info-label">PAN</div>
                <div class="info-value">${data.pan}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Aadhar</div>
                <div class="info-value">${data.aadhar}</div>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="section">
            <div class="section-title">Payment Details</div>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Payment ID</div>
                <div class="info-value">${data.paymentId}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Payment Date</div>
                <div class="info-value">${receiptDate}</div>
              </div>
            </div>
          </div>

          <!-- Amount Section -->
          <div class="amount-section">
            <div class="amount-row">
              <span class="amount-label">Registration Fee</span>
              <span class="amount-value">₹${data.amount.toFixed(2)}</span>
            </div>
            <div class="amount-row">
              <span class="amount-label">Tax (0%)</span>
              <span class="amount-value">₹0.00</span>
            </div>
            <div class="divider"></div>
            <div class="amount-row total">
              <span>Total Amount Paid</span>
              <span>₹${data.amount.toFixed(2)}</span>
            </div>
            <div class="status-badge">✓ Payment Successful</div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>This is an electronically generated receipt. No signature required.</p>
            <p style="margin-top: 10px;">Thank you for registering with GV Consultancy</p>
            <p style="margin-top: 10px; color: #999;">Generated on ${new Date().toLocaleString('en-IN')}</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  // Download receipt as PDF
  async downloadReceiptPDF(data: ReceiptData, logoUrl?: string): Promise<void> {
    try {
      const html = this.generateReceiptHTML(data, logoUrl);
      const element = document.createElement('div');
      element.innerHTML = html;
      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`receipt-${data.candidateId}.pdf`);

      document.body.removeChild(element);
    } catch (error) {
      console.error('Error generating receipt PDF:', error);
      throw error;
    }
  },

  // Display receipt in modal/preview
  displayReceiptPreview(data: ReceiptData, logoUrl?: string): string {
    return this.generateReceiptHTML(data, logoUrl);
  },
};
