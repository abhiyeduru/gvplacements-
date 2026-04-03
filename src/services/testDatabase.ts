import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CandidateData } from '../types';

// Test function to verify database connectivity
export const testDatabaseConnection = async (): Promise<{
  connected: boolean;
  message: string;
  candidateCount?: number;
}> => {
  try {
    if (!db) {
      return {
        connected: false,
        message: 'Firebase not initialized',
      };
    }

    // Try to read from database
    const q = query(collection(db, 'candidates'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return {
      connected: true,
      message: `Database connected! Found ${snapshot.size} candidates`,
      candidateCount: snapshot.size,
    };
  } catch (error) {
    console.error('Database connection test failed:', error);
    return {
      connected: false,
      message: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

// Test function to add a test candidate
export const addTestCandidate = async (testData?: Partial<CandidateData>): Promise<{
  success: boolean;
  message: string;
  docId?: string;
}> => {
  try {
    if (!db) {
      return {
        success: false,
        message: 'Firebase not initialized',
      };
    }

    const candidate: Partial<CandidateData> = testData || {
      name: 'Test Candidate',
      fatherName: 'Test Father',
      phone: '9876543210',
      email: 'test@example.com',
      pan: 'ABCDE1234F',
      aadhar: '123456789012',
      dob: '1995-05-15',
      gender: 'Male',
      qualification: 'Bachelor\'s Degree',
      experience: '1-3 years',
      position: 'Test Position',
      currentAddress: '123 Test Street, Test City, Test State 400001',
      permanentAddress: '456 Test Road, Test City, Test State 411001',
      paymentStatus: 'success',
      paymentAmount: 1000,
      paymentId: `test_${Date.now()}`,
      status: 'registered',
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'candidates'), candidate);

    return {
      success: true,
      message: `Test candidate added successfully with ID: ${docRef.id}`,
      docId: docRef.id,
    };
  } catch (error) {
    console.error('Error adding test candidate:', error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

// Test function to verify all candidates
export const verifyAllCandidates = async (): Promise<{
  success: boolean;
  message: string;
  candidates?: any[];
}> => {
  try {
    if (!db) {
      return {
        success: false,
        message: 'Firebase not initialized',
      };
    }

    const q = query(collection(db, 'candidates'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const candidates = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      message: `Found ${candidates.length} candidates in database`,
      candidates,
    };
  } catch (error) {
    console.error('Error verifying candidates:', error);
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};
