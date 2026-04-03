#!/usr/bin/env node

/**
 * Store Test Data to Firebase Firestore using REST API
 * This script writes data directly to Firestore via REST API
 */

const https = require('https');
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
const PROJECT_ID = 'gravi-multiple';
const API_KEY = 'AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg';

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

// Convert data to Firestore format
function convertToFirestoreFormat(data) {
  const fields = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      fields[key] = { integerValue: value.toString() };
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
    }
  }
  return { fields };
}

// Store document via REST API
function storeDocument(collectionPath, documentData) {
  return new Promise((resolve, reject) => {
    const firestoreData = convertToFirestoreFormat(documentData);
    const jsonData = JSON.stringify(firestoreData);

    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionPath}?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonData),
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          try {
            const parsed = JSON.parse(responseData);
            resolve(parsed);
          } catch (e) {
            resolve({ success: true });
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(jsonData);
    req.end();
  });
}

// Retrieve documents via REST API
function retrieveDocuments() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates?key=${API_KEY}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(responseData);
            resolve(parsed);
          } catch (e) {
            resolve({ documents: [] });
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Convert Firestore format back to normal
function convertFromFirestoreFormat(fields) {
  const data = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value.stringValue) {
      data[key] = value.stringValue;
    } else if (value.integerValue) {
      data[key] = parseInt(value.integerValue);
    } else if (value.booleanValue) {
      data[key] = value.booleanValue;
    }
  }
  return data;
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║   GRAVITY - STORE DATA TO FIRESTORE (REST API)                ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝\n', 'cyan');

  logSection('💾 Storing Data to Firestore');

  const storedIds = [];

  for (let i = 0; i < testCandidates.length; i++) {
    try {
      const candidate = testCandidates[i];
      const response = await storeDocument('candidates', candidate);
      
      // Extract document ID from response
      const docId = response.name ? response.name.split('/').pop() : `doc_${i}`;
      storedIds.push(docId);
      
      log(`✓ Stored candidate ${i + 1}/3: ${candidate.name}`, 'green');
      log(`  Document ID: ${docId}`, 'blue');
    } catch (error) {
      log(`✗ Failed to store candidate ${i + 1}: ${error.message}`, 'red');
    }
  }

  log(`\n✓ Successfully stored ${storedIds.length} candidates to Firestore`, 'green');

  // Wait a moment
  await new Promise(resolve => setTimeout(resolve, 2000));

  logSection('✓ Verifying Data in Firestore');

  try {
    const response = await retrieveDocuments();
    const documents = response.documents || [];
    
    log(`✓ Retrieved ${documents.length} candidates from Firestore`, 'green');

    const candidates = documents.map(doc => ({
      id: doc.name.split('/').pop(),
      ...convertFromFirestoreFormat(doc.fields),
    }));

    // Display candidates
    logSection('👥 Candidates in Firestore');
    
    candidates.forEach((candidate, index) => {
      console.log(`\n${index + 1}. ${candidate.name}`);
      console.log(`   ID: ${candidate.id}`);
      console.log(`   Email: ${candidate.email}`);
      console.log(`   Phone: ${candidate.phone}`);
      console.log(`   Position: ${candidate.position}`);
      console.log(`   Status: ${candidate.status}`);
      console.log(`   Payment: ${candidate.paymentStatus}`);
    });

    // Save results
    logSection('📁 Saving Results to Files');

    const jsonPath = path.join(process.cwd(), 'firestore-stored-data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(candidates, null, 2));
    log(`✓ Saved to: firestore-stored-data.json`, 'green');

    const csvPath = path.join(process.cwd(), 'firestore-stored-data.csv');
    const csvHeader = 'ID,Name,Email,Phone,Position,Status,Payment Status\n';
    const csvData = candidates.map(c => 
      `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.position}","${c.status}","${c.paymentStatus}"`
    ).join('\n');
    fs.writeFileSync(csvPath, csvHeader + csvData);
    log(`✓ Saved to: firestore-stored-data.csv`, 'green');

    // Summary
    logSection('✅ Summary');
    log(`✓ Data stored to Firestore: ${storedIds.length} candidates`, 'green');
    log(`✓ Data verified: ${candidates.length} candidates found`, 'green');
    log(`✓ Results saved to files`, 'green');

    log('\n📊 Firestore Collection: candidates', 'cyan');
    log(`📈 Total Documents: ${candidates.length}`, 'cyan');
    log(`🔗 Project: gravi-multiple`, 'cyan');

    log('\n✨ Data successfully stored to Firestore!\n', 'green');

  } catch (error) {
    log(`✗ Failed to verify data: ${error.message}`, 'red');
  }

  process.exit(0);
}

// Run main function
main().catch(error => {
  log(`\n✗ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
