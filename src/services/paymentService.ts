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

  // Verify Razorpay is loaded
  if (!window.Razorpay) {
    console.error('❌ Razorpay script not loaded');
    console.log('📋 Debugging info:');
    console.log('- Current domain:', window.location.hostname);
    console.log('- Razorpay key:', import.meta.env.VITE_RAZORPAY_KEY ? '✓ Set' : '✗ Missing');
    console.log('- Window.Razorpay:', window.Razorpay);
    onError('Razorpay payment system not loaded. Please refresh the page and try again.');
    return;
  }

  try {
    // Get the amount set by admin
    const amount = await paymentSettingsService.getSelectedAmount();
    const amountInPaise = amount * 100; // Convert to paise

    console.log('💳 Initiating Razorpay payment:');
    console.log('- Amount:', amount, 'INR');
    console.log('- Domain:', window.location.hostname);
    console.log('- Key:', import.meta.env.VITE_RAZORPAY_KEY?.substring(0, 10) + '...');

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amountInPaise,
      currency: 'INR',
      name: 'Gravity Job Assistance',
      description: 'Candidate Registration Fee',
      prefill: {
        name: candidateData.name,
        email: candidateData.email,
        contact: candidateData.phone,
      },
      theme: { color: '#f5a623' },
      handler: (response: PaymentResponse) => {
        console.log('✅ Payment successful:', response);
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          console.log('⚠️ Payment cancelled by user');
          onError('Payment cancelled. You can try again.');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    console.log('🔓 Opening Razorpay modal...');
    rzp.open();
  } catch (error) {
    console.error('❌ Payment initialization error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    
    // Provide helpful error messages
    if (errorMsg.includes('domain')) {
      onError('Domain not whitelisted in Razorpay. Contact support.');
    } else if (errorMsg.includes('key')) {
      onError('Invalid Razorpay key. Check configuration.');
    } else if (errorMsg.includes('CORS')) {
      onError('CORS error. Check domain settings in Razorpay dashboard.');
    } else {
      onError(`Payment error: ${errorMsg}`);
    }
  }
};
