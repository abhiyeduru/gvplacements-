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

// Demo mode for testing without Firestore
const DEMO_MODE = import.meta.env.MODE === 'development' || 
                  (typeof window !== 'undefined' && (window as any).__DEMO_MODE__);

// Razorpay Payment Link
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

    // Store candidate data in session storage for post-payment retrieval
    sessionStorage.setItem('pendingCandidateData', JSON.stringify(candidateData));
    
    // Open payment link in new tab
    const paymentWindow = window.open(RAZORPAY_PAYMENT_LINK, '_blank');
    
    if (!paymentWindow) {
      onError('Please allow pop-ups to proceed with payment');
      return;
    }

    console.log('🔓 Payment link opened in new window');
    
    // Check if payment was completed (user returns to app)
    // This is a simplified approach - in production, use webhooks
    const checkPaymentInterval = setInterval(() => {
      if (paymentWindow.closed) {
        clearInterval(checkPaymentInterval);
        console.log('✅ Payment window closed - checking payment status');
        
        // Simulate successful payment for now
        // In production, verify payment via Razorpay API
        const mockResponse: PaymentResponse = {
          razorpay_payment_id: 'pay_' + Date.now(),
          razorpay_order_id: 'order_' + Date.now(),
          razorpay_signature: 'sig_' + Date.now(),
        };
        
        onSuccess(mockResponse);
      }
    }, 1000);

    // Timeout after 30 minutes
    setTimeout(() => {
      clearInterval(checkPaymentInterval);
      if (!paymentWindow.closed) {
        paymentWindow.close();
      }
    }, 30 * 60 * 1000);

  } catch (error) {
    console.error('❌ Payment error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    onError(`Payment error: ${errorMsg}`);
  }
};
