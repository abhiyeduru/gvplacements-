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

  // Get Razorpay key - try multiple sources
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || 
                      (window as any).__RAZORPAY_KEY__ ||
                      'rzp_live_SMj9EQLZSXaW4g'; // Fallback to live key

  console.log('🔍 Razorpay Key Debug:');
  console.log('- import.meta.env.VITE_RAZORPAY_KEY:', import.meta.env.VITE_RAZORPAY_KEY ? '✓ Set' : '✗ Missing');
  console.log('- window.__RAZORPAY_KEY__:', (window as any).__RAZORPAY_KEY__ ? '✓ Set' : '✗ Missing');
  console.log('- Using key:', razorpayKey?.substring(0, 15) + '...');
  console.log('- Demo mode:', DEMO_MODE ? '✓ Enabled' : '✗ Disabled');

  // Verify Razorpay is loaded
  if (!window.Razorpay) {
    console.error('❌ Razorpay script not loaded');
    console.log('📋 Debugging info:');
    console.log('- Current domain:', window.location.hostname);
    console.log('- Window.Razorpay:', window.Razorpay);
    onError('Razorpay payment system not loaded. Please refresh the page and try again.');
    return;
  }

  // Verify key is available
  if (!razorpayKey) {
    console.error('❌ Razorpay key not found');
    onError('Razorpay key not configured. Please contact support.');
    return;
  }

  try {
    // Get the amount set by admin (with fallback for demo mode)
    let amount = 1;
    try {
      amount = await paymentSettingsService.getSelectedAmount();
    } catch (err) {
      console.warn('⚠️ Could not fetch payment amount from Firestore, using default:', amount);
      if (!DEMO_MODE) {
        throw err; // Re-throw if not in demo mode
      }
    }
    
    const amountInPaise = amount * 100; // Convert to paise

    console.log('💳 Initiating Razorpay payment:');
    console.log('- Amount:', amount, 'INR');
    console.log('- Domain:', window.location.hostname);
    console.log('- Key:', razorpayKey?.substring(0, 15) + '...');

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
    } else if (errorMsg.includes('permission') || errorMsg.includes('403')) {
      onError('Firebase permission denied. Admin needs to update Firestore security rules.');
    } else {
      onError(`Payment error: ${errorMsg}`);
    }
  }
};
