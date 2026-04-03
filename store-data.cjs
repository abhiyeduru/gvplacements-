#!/usr/bin/env node

/**
 * Store Test Data to Firebase Firestore
 * This script actually writes data to the Firebase database
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg",
  authDomain: "gravi-multiple.firebaseapp.com",
  projectId: "gravi-multiple",
  storageBucket: "gravi-multiple.firebasestorage.app",
  messagingSenderId: "1041107905972",
  appId: "1:1041107905972:web:f60b32fbd81676554bd6e1",
  measurementId: "G-XWN6VCP381",
};

// Test data to store
const testCandidates = [
  {
    name: 'Rajesh Kumar',
    fatherName: 'Suresh Kumar',
    phone: '9876543210',
    email: 'rajesh@gravity.com',
    pan: 'ABCDE1234F',
    aadhar: '123456789012',
    dob: '1995-05-15',
    gender: 'Male',
    qualification: 'Bachelor\'s Degree',
    experience: '1-3 years',
    position: 'Senior Developer',
    currentAddress: '123 Main Street, Mumbai, Maharashtra 400001',
    permanentAddress: '456 Park Road, Pune, Maharashtra 411001',
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: `test_${Date.now()}_1`,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Priya Singh',
    fatherName: 'Vikram Singh',
    phone: '9876543211',
    email: 'priya@gravity.com',
    pan: 'BCDEF2345G',
    aadhar: '234567890123',
    dob: '1996-08-22',
    gender: 'Female',
    qualification: 'Master\'s Degree',
    experience: '3-5 years',
    position: 'Data Science Manager',
    currentAddress: '789 Park Avenue, Bangalore, Karnataka 560001',
    permanentAddress: '321 Garden Lane, Hyderabad, Telangana 500001',
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: `test_${Date.now()}_2`,
    status: 'placed',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    name: 'Amit Patel',
    fatherName: 'Ramesh Patel',
    phone: '9876543212',
    email: 'amit@gravity.com',
    pan: 'CDEFG3456H',
    aadhar: '345678901234',
    dob: '1994-03-10',
    gender: 'Male',
    qualification: 'Bachelor\'s Degree',
    experience: '0-1 years',
    position: 'Full Stack Developer',
    currentAddress: '555 Business Park, Delhi, Delhi 110001',
    permanentAddress: '777 Residential Area, Jaipur, Rajasthan 302001',
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: `test_${Date.now()}_3`,
    status: 'registered',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

async function initializeFirebase() {
  logSection('🔥 Initializing Firebase');
  
  try {
    // Initialize Firebase Admin SDK
    admin.initializeApp({
      projectId: firebaseConfig.projectId,
    });
    
    log('✓ Firebase Admin SDK initialized', 'green');
    return admin.firestore();
  } catch (error) {
    log(`✗ Failed to initialize Firebase: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function storeDataToFirestore(db) {
  logSection('💾 Storing Data to Firestore');
  
  const storedIds = [];
  
  for (let i = 0; i < testCandidates.length; i++) {
    try {
      const candidate = testCandidates[i];
      const docRef = await db.collection('candidates').add(candidate);
      storedIds.push(docRef.id);
      log(`✓ Stored candidate ${i + 1}/3: ${candidate.name}`, 'green');
      log(`  Document ID: ${docRef.id}`, 'blue');
    } catch (error) {
      log(`✗ Failed to store candidate ${i + 1}: ${error.message}`, 'red');
    }
  }
  
  log(`\n✓ Successfully stored ${storedIds.length} candidates to Firestore`, 'green');
  return storedIds;
}

async function verifyDataInFirestore(db) {
  logSection('✓ Verifying Data in Firestore');
  
  try {
    const snapshot = await db.collection('candidates')
      .orderBy('createdAt', 'desc')
      .get();
    
    log(`✓ Retrieved ${snapshot.size} candidates from Firestore`, 'green');
    
    const candidates = [];
    snapshot.forEach(doc => {
      candidates.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return candidates;
  } catch (error) {
    log(`✗ Failed to verify data: ${error.message}`, 'red');
    return [];
  }
}

function displayCandidates(candidates) {
  logSection('👥 Candidates in Firestore');
  
  candidates.forEach((candidate, index) => {
    console.log(`\n${index + 1}. ${candidate.name}`);
    console.log(`   ID: ${candidate.id}`);
    console.log(`   Email: ${candidate.email}`);
    console.log(`   Phone: ${candidate.phone}`);
    console.log(`   Position: ${candidate.position}`);
    console.log(`   Status: ${candidate.status}`);
    console.log(`   Payment: ${candidate.paymentStatus}`);
    console.log(`   Created: ${new Date(candidate.createdAt).toLocaleString()}`);
  });
}

function saveResultsToFile(candidates) {
  logSection('📁 Saving Results to Files');
  
  try {
    // Save as JSON
    const jsonPath = path.join(process.cwd(), 'firestore-data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(candidates, null, 2));
    log(`✓ Saved to: firestore-data.json`, 'green');
    
    // Save as CSV
    const csvPath = path.join(process.cwd(), 'firestore-data.csv');
    const csvHeader = 'ID,Name,Email,Phone,Position,Status,Payment Status,Created At\n';
    const csvData = candidates.map(c => 
      `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.position}","${c.status}","${c.paymentStatus}","${c.createdAt}"`
    ).join('\n');
    fs.writeFileSync(csvPath, csvHeader + csvData);
    log(`✓ Saved to: firestore-data.csv`, 'green');
    
    log(`\n✓ All data saved successfully!`, 'green');
  } catch (error) {
    log(`✗ Failed to save results: ${error.message}`, 'red');
  }
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║   GRAVITY - STORE DATA TO FIRESTORE                           ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝\n', 'cyan');

  // Initialize Firebase
  const db = await initializeFirebase();

  // Store data to Firestore
  const storedIds = await storeDataToFirestore(db);

  // Wait for data to sync
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Verify data
  const candidates = await verifyDataInFirestore(db);

  // Display candidates
  displayCandidates(candidates);

  // Save results
  saveResultsToFile(candidates);

  // Summary
  logSection('✅ Summary');
  log(`✓ Firebase initialized: SUCCESS`, 'green');
  log(`✓ Data stored to Firestore: ${storedIds.length} candidates`, 'green');
  log(`✓ Data verified: ${candidates.length} candidates found`, 'green');
  log(`✓ Results saved to files`, 'green');

  log('\n📊 Firestore Collection: candidates', 'cyan');
  log(`📈 Total Documents: ${candidates.length}`, 'cyan');
  log(`🔗 Project: gravi-multiple`, 'cyan');

  log('\n✨ Data successfully stored to Firestore!\n', 'green');

  // Close Firebase
  await admin.app().delete();
  process.exit(0);
}

// Run main function
main().catch(error => {
  log(`\n✗ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
