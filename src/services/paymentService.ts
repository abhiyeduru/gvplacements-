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

// Get Razorpay key from environment or fallback
const getRazorpayKey = () => {
  return import.meta.env.VITE_RAZORPAY_KEY || 
         (typeof window !== 'undefined' && (window as any).__RAZORPAY_KEY__) ||
         'rzp_live_Sbs5g8lzf5HMOD';
};

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

  const razorpayKey = getRazorpayKey();

  console.log('🔍 Razorpay Configuration:');
  console.log('- Key:', razorpayKey?.substring(0, 15) + '...');
  console.log('- Candidate:', candidateData.name);

  // Verify Razorpay is loaded
  if (!window.Razorpay) {
    console.error('❌ Razorpay script not loaded');
    onError('Razorpay payment system not loaded. Please refresh the page.');
    return;
  }

  if (!razorpayKey) {
    console.error('❌ Razorpay key not found');
    onError('Razorpay key not configured. Please contact support.');
    return;
  }

  try {
    // Get the amount set by admin
    let amount = 1;
    try {
      amount = await paymentSettingsService.getSelectedAmount();
    } catch (err) {
      console.warn('⚠️ Could not fetch payment amount, using default: ₹1');
    }
    
    const amountInPaise = amount * 100; // Convert to paise

    console.log('💳 Initiating Razorpay payment:');
    console.log('- Amount:', amount, 'INR');
    console.log('- Domain:', window.location.hostname);

    const options = {
      key: razorpayKey,
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
    console.log('🔓 Opening Razorpay checkout...');
    rzp.open();
  } catch (error) {
    console.error('❌ Payment error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    onError(`Payment error: ${errorMsg}`);
  }
};
