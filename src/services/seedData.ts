import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CandidateData } from '../types';

const dummyCandidates: Partial<CandidateData>[] = [
  {
    name: 'Rajesh Kumar',
    fatherName: 'Suresh Kumar',
    phone: '9876543210',
    email: 'rajesh.kumar@email.com',
    pan: 'ABCDE1234F',
    aadhar: '123456789012',
    dob: '1995-05-15',
    gender: 'Male',
    qualification: 'Bachelor\'s Degree',
    experience: '1-3 years',
    position: 'Software Engineer',
    referralName: 'Arjun Verma',
    currentAddress: '123 Main Street, Mumbai, Maharashtra 400001',
    permanentAddress: '456 Village Road, Pune, Maharashtra 411001',
    notes: 'Experienced in React and Node.js',
    termsAccepted: true,
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: 'pay_demo_001',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'Priya Singh',
    fatherName: 'Vikram Singh',
    phone: '9876543211',
    email: 'priya.singh@email.com',
    pan: 'BCDEF2345G',
    aadhar: '234567890123',
    dob: '1996-08-22',
    gender: 'Female',
    qualification: 'Master\'s Degree',
    experience: '3-5 years',
    position: 'Data Analyst',
    referralName: 'Rahul Gupta',
    currentAddress: '789 Park Avenue, Bangalore, Karnataka 560001',
    permanentAddress: '321 Garden Lane, Hyderabad, Telangana 500001',
    notes: 'Strong in Python and SQL',
    termsAccepted: true,
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: 'pay_demo_002',
    status: 'placed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'Amit Patel',
    fatherName: 'Ramesh Patel',
    phone: '9876543212',
    email: 'amit.patel@email.com',
    pan: 'CDEFG3456H',
    aadhar: '345678901234',
    dob: '1994-03-10',
    gender: 'Male',
    qualification: 'Bachelor\'s Degree',
    experience: '0-1 years',
    position: 'Marketing Executive',
    referralName: 'Neha Kapoor',
    currentAddress: '555 Business Park, Delhi, Delhi 110001',
    permanentAddress: '777 Residential Area, Jaipur, Rajasthan 302001',
    notes: 'Digital marketing enthusiast',
    termsAccepted: true,
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: 'pay_demo_003',
    status: 'registered',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'Neha Sharma',
    fatherName: 'Arun Sharma',
    phone: '9876543213',
    email: 'neha.sharma@email.com',
    pan: 'DEFGH4567I',
    aadhar: '456789012345',
    dob: '1997-11-30',
    gender: 'Female',
    qualification: 'Diploma',
    experience: 'Fresher',
    position: 'Graphic Designer',
    referralName: 'Sanjay Reddy',
    currentAddress: '999 Creative Hub, Pune, Maharashtra 411006',
    permanentAddress: '111 Art Street, Nashik, Maharashtra 422001',
    notes: 'UI/UX design portfolio available',
    termsAccepted: true,
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: 'pay_demo_004',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'Vikram Desai',
    fatherName: 'Mohan Desai',
    phone: '9876543214',
    email: 'vikram.desai@email.com',
    pan: 'EFGHI5678J',
    aadhar: '567890123456',
    dob: '1993-07-18',
    gender: 'Male',
    qualification: 'Master\'s Degree',
    experience: '5-10 years',
    position: 'Business Development',
    referralName: 'Priya Nair',
    currentAddress: '222 Corporate Tower, Gurgaon, Haryana 122001',
    permanentAddress: '333 Township, Chandigarh, Chandigarh 160001',
    notes: 'B2B sales experience',
    termsAccepted: true,
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: 'pay_demo_005',
    status: 'placed',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const seedDatabase = async (): Promise<void> => {
  try {
    if (!db) {
      console.warn('Firebase not available, skipping seed');
      return;
    }

    console.log('Seeding database with dummy candidates...');
    
    for (const candidate of dummyCandidates) {
      await addDoc(collection(db, 'candidates'), {
        ...candidate,
        createdAt: candidate.createdAt || new Date().toISOString(),
      });
    }
    
    console.log('Database seeded successfully with 5 dummy candidates');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
