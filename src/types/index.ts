export interface CandidateData {
  id?: string;
  name: string;
  fatherName: string;
  phone: string;
  email: string;
  position: string;
  referralName?: string;
  currentAddress: string;
  permanentAddress: string;
  pan: string;
  aadhar: string;
  dob: string;
  gender: string;
  qualification: string;
  experience: string;
  notes?: string;
  resumeUrl?: string;
  panUrl?: string;
  termsAccepted: boolean;
  paymentStatus: 'pending' | 'success' | 'failed';
  paymentId?: string;
  paymentAmount: number;
  paymentDate?: string;
  status: 'registered' | 'confirmed' | 'placed';
  createdAt: string;
}

export interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}
