import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { CandidateData } from '../types';

export const saveCandidateProfile = async (data: CandidateData): Promise<string> => {
  try {
    if (!db) {
      console.warn('Firebase not ready, using demo mode');
      console.warn('DB object:', db);
      return `DEMO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    console.log('📝 Saving candidate profile...', data);
    const candidateData = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    console.log('📝 Data to save:', candidateData);

    const docRef = await addDoc(collection(db, 'candidates'), candidateData);
    console.log('✓ Candidate saved successfully:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving candidate:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      code: (error as any)?.code,
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Return demo ID if Firebase fails
    return `DEMO-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
};

export const getCandidateByEmail = async (email: string): Promise<CandidateData | null> => {
  try {
    if (!db) {
      return null;
    }

    const q = query(collection(db, 'candidates'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : (snapshot.docs[0].data() as CandidateData);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return null;
  }
};
