import { CandidateData } from '../types';

// Email Service
export const sendConfirmationEmail = async (candidate: CandidateData, docId: string): Promise<boolean> => {
  try {
    const emailContent = `
      <h2>Welcome to Gravity Job Assistance!</h2>
      <p>Dear ${candidate.name},</p>
      <p>Your registration has been successfully completed. Here are your details:</p>
      <ul>
        <li><strong>Confirmation ID:</strong> ${docId.toUpperCase()}</li>
        <li><strong>Email:</strong> ${candidate.email}</li>
        <li><strong>Phone:</strong> ${candidate.phone}</li>
        <li><strong>Position:</strong> ${candidate.position}</li>
        <li><strong>Registration Fee:</strong> ₹${candidate.paymentAmount}</li>
      </ul>
      <p>Our team will contact you within 48 hours to schedule your interviews.</p>
      <p>Best regards,<br/>Gravity Team</p>
    `;

    // Call backend API to send email
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: candidate.email,
        subject: `Registration Confirmation - ${docId.toUpperCase()}`,
        html: emailContent,
      }),
    });

    if (!response.ok) {
      console.warn('Email sending failed, using demo mode');
      return false;
    }

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// WhatsApp Service
export const sendWhatsAppMessage = async (candidate: CandidateData, docId: string): Promise<boolean> => {
  try {
    const message = `
Hello ${candidate.name}! 👋

Welcome to Gravity Job Assistance! 🎉

Your registration is confirmed!
📋 Confirmation ID: ${docId.toUpperCase()}
📱 Phone: ${candidate.phone}
💼 Position: ${candidate.position}
💰 Fee: ₹${candidate.paymentAmount}

Our team will contact you within 48 hours to schedule interviews.

Thank you for choosing Gravity! 🚀
    `.trim();

    // Call backend API to send WhatsApp
    const response = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: candidate.phone,
        message: message,
      }),
    });

    if (!response.ok) {
      console.warn('WhatsApp sending failed, using demo mode');
      return false;
    }

    console.log('WhatsApp message sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    return false;
  }
};

// Combined notification service
export const sendRegistrationNotifications = async (
  candidate: CandidateData,
  docId: string
): Promise<{ email: boolean; whatsapp: boolean }> => {
  const [emailSent, whatsappSent] = await Promise.all([
    sendConfirmationEmail(candidate, docId),
    sendWhatsAppMessage(candidate, docId),
  ]);

  return { email: emailSent, whatsapp: whatsappSent };
};
