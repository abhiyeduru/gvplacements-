import { CandidateData, PaymentResponse } from '../types';
import { paymentSettingsService } from './paymentSettingsService';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Rate limiting
let lastPaymentAttempt = 0;
const PAYMENT_COOLDOWN = 2000; // 2 seconds between attempts

// Razorpay Payment Link with return URL
const RAZORPAY_PAYMENT_LINK = 'https://rzp.io/rzp/vgMJARt';

export const initiateRazorpayPayment = async (
  candidateData: CandidateData,
  onSuccess: (response: PaymentResponse) => void,
  onError: (error: string) => void
): Promise<void> => {
  // Check rate limit
  const now = Date.now();
  if (now - lastPaymentAttempt < PAYMENT_COOLDOWN) {
    onError('Please wait before trying again');
    return;
  }
  lastPaymentAttempt = now;

  try {
    console.log('💳 Opening Razorpay Payment Link...');
    console.log('- Link:', RAZORPAY_PAYMENT_LINK);
    console.log('- Candidate:', candidateData.name);

    // Store candidate data in localStorage for post-payment retrieval
    localStorage.setItem('pendingCandidateData', JSON.stringify(candidateData));
    
    // Create return URL with candidate data encoded
    const returnUrl = `${window.location.origin}/payment-return?candidate=${encodeURIComponent(JSON.stringify(candidateData))}`;
    console.log('- Return URL:', returnUrl);

    // Redirect to payment link
    // The payment link should be configured in Razorpay dashboard with this return URL
    window.location.href = RAZORPAY_PAYMENT_LINK;

  } catch (error) {
    console.error('❌ Payment error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    onError(`Payment error: ${errorMsg}`);
  }
};
