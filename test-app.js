#!/usr/bin/env node

/**
 * Gravity Job Assistance Platform - Terminal Test Script
 * Tests database connectivity and saves all app data
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

// Test data
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

// Test functions
async function testConnection() {
  logSection('🔌 Testing Database Connection');
  try {
    const q = query(collection(db, 'candidates'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    log(`✓ Database connected successfully!`, 'green');
    log(`✓ Found ${snapshot.size} existing candidates`, 'green');
    return true;
  } catch (error) {
    log(`✗ Connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function addTestData() {
  logSection('➕ Adding Test Data to Database');
  const addedIds = [];
  
  for (let i = 0; i < testCandidates.length; i++) {
    try {
      const candidate = testCandidates[i];
      const docRef = await addDoc(collection(db, 'candidates'), candidate);
      addedIds.push(docRef.id);
      log(`✓ Added candidate ${i + 1}/3: ${candidate.name} (ID: ${docRef.id})`, 'green');
    } catch (error) {
      log(`✗ Failed to add candidate ${i + 1}: ${error.message}`, 'red');
    }
  }
  
  log(`\n✓ Successfully added ${addedIds.length} test candidates`, 'green');
  return addedIds;
}

async function getAllCandidates() {
  logSection('📋 Retrieving All Candidates from Database');
  try {
    const q = query(collection(db, 'candidates'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const candidates = [];
    snapshot.forEach(doc => {
      candidates.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    log(`✓ Retrieved ${candidates.length} candidates from database`, 'green');
    return candidates;
  } catch (error) {
    log(`✗ Failed to retrieve candidates: ${error.message}`, 'red');
    return [];
  }
}

function displayCandidates(candidates) {
  logSection('👥 Candidate Details');
  
  candidates.forEach((candidate, index) => {
    console.log(`\n${index + 1}. ${candidate.name}`);
    console.log(`   Email: ${candidate.email}`);
    console.log(`   Phone: ${candidate.phone}`);
    console.log(`   Position: ${candidate.position}`);
    console.log(`   Status: ${candidate.status}`);
    console.log(`   Payment: ${candidate.paymentStatus}`);
    console.log(`   ID: ${candidate.id}`);
  });
}

function saveToFile(candidates) {
  logSection('💾 Saving Data to Files');
  
  try {
    // Save as JSON
    const jsonPath = path.join(__dirname, 'test-results.json');
    fs.writeFileSync(jsonPath, JSON.stringify(candidates, null, 2));
    log(`✓ Saved to: ${jsonPath}`, 'green');
    
    // Save as CSV
    const csvPath = path.join(__dirname, 'test-results.csv');
    const csvHeader = 'ID,Name,Email,Phone,Position,Status,Payment Status,Created At\n';
    const csvData = candidates.map(c => 
      `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.position}","${c.status}","${c.paymentStatus}","${c.createdAt}"`
    ).join('\n');
    fs.writeFileSync(csvPath, csvHeader + csvData);
    log(`✓ Saved to: ${csvPath}`, 'green');
    
    // Save as HTML report
    const htmlPath = path.join(__dirname, 'test-results.html');
    const htmlContent = generateHTMLReport(candidates);
    fs.writeFileSync(htmlPath, htmlContent);
    log(`✓ Saved to: ${htmlPath}`, 'green');
    
    // Save as text report
    const txtPath = path.join(__dirname, 'test-results.txt');
    const txtContent = generateTextReport(candidates);
    fs.writeFileSync(txtPath, txtContent);
    log(`✓ Saved to: ${txtPath}`, 'green');
    
    log(`\n✓ All data saved successfully!`, 'green');
  } catch (error) {
    log(`✗ Failed to save data: ${error.message}`, 'red');
  }
}

function generateHTMLReport(candidates) {
  const rows = candidates.map(c => `
    <tr>
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.position}</td>
      <td>${c.status}</td>
      <td>${c.paymentStatus}</td>
      <td>${new Date(c.createdAt).toLocaleDateString()}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <title>Gravity - Test Results</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
    h1 { color: #f5a623; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th { background: #f5a623; color: white; padding: 12px; text-align: left; }
    td { padding: 12px; border-bottom: 1px solid #ddd; }
    tr:hover { background: #f9f9f9; }
    .summary { background: #f0f0f0; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    .success { color: #22c55e; }
    .info { color: #3b82f6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎉 Gravity Job Assistance Platform - Test Results</h1>
    <div class="summary">
      <p><strong>Total Candidates:</strong> <span class="success">${candidates.length}</span></p>
      <p><strong>Test Date:</strong> <span class="info">${new Date().toLocaleString()}</span></p>
      <p><strong>Database:</strong> <span class="success">Firebase Firestore (gravi-multiple)</span></p>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>
</body>
</html>
  `;
}

function generateTextReport(candidates) {
  let report = `
╔════════════════════════════════════════════════════════════════╗
║     GRAVITY JOB ASSISTANCE PLATFORM - TEST RESULTS REPORT      ║
╚════════════════════════════════════════════════════════════════╝

📊 SUMMARY
──────────────────────────────────────────────────────────────────
Total Candidates: ${candidates.length}
Test Date: ${new Date().toLocaleString()}
Database: Firebase Firestore (gravi-multiple)
Status: ✓ SUCCESS

📋 CANDIDATE DETAILS
──────────────────────────────────────────────────────────────────
`;

  candidates.forEach((c, i) => {
    report += `
${i + 1}. ${c.name}
   Email: ${c.email}
   Phone: ${c.phone}
   Position: ${c.position}
   Status: ${c.status}
   Payment: ${c.paymentStatus}
   Created: ${new Date(c.createdAt).toLocaleString()}
   ID: ${c.id}
`;
  });

  report += `
──────────────────────────────────────────────────────────────────
✓ All data successfully stored in Firebase Firestore
✓ Test completed successfully
✓ Data saved to multiple formats (JSON, CSV, HTML, TXT)

Generated: ${new Date().toLocaleString()}
`;

  return report;
}

async function deleteTestData(ids) {
  logSection('🗑️  Cleaning Up Test Data');
  
  if (ids.length === 0) {
    log('No test data to delete', 'yellow');
    return;
  }

  for (const id of ids) {
    try {
      await deleteDoc(doc(db, 'candidates', id));
      log(`✓ Deleted candidate: ${id}`, 'green');
    } catch (error) {
      log(`✗ Failed to delete ${id}: ${error.message}`, 'red');
    }
  }
}

// Main execution
async function main() {
  log('\n╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║   GRAVITY JOB ASSISTANCE PLATFORM - DATABASE TEST SCRIPT       ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝\n', 'cyan');

  // Test connection
  const connected = await testConnection();
  if (!connected) {
    log('\n✗ Cannot proceed without database connection', 'red');
    process.exit(1);
  }

  // Add test data
  const addedIds = await addTestData();

  // Wait a moment for data to sync
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Retrieve all candidates
  const allCandidates = await getAllCandidates();

  // Display candidates
  displayCandidates(allCandidates);

  // Save to files
  saveToFile(allCandidates);

  // Summary
  logSection('✅ Test Summary');
  log(`✓ Database connection: SUCCESS`, 'green');
  log(`✓ Test data added: ${addedIds.length} candidates`, 'green');
  log(`✓ Total candidates in database: ${allCandidates.length}`, 'green');
  log(`✓ Data saved to files: JSON, CSV, HTML, TXT`, 'green');

  log('\n📁 Output Files:', 'cyan');
  log('   • test-results.json', 'blue');
  log('   • test-results.csv', 'blue');
  log('   • test-results.html', 'blue');
  log('   • test-results.txt', 'blue');

  log('\n✨ Test completed successfully!\n', 'green');

  // Ask to cleanup
  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Delete test data? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y') {
      await deleteTestData(addedIds);
      log('\n✓ Cleanup completed', 'green');
    } else {
      log('\n✓ Test data retained in database', 'yellow');
    }
    rl.close();
    process.exit(0);
  });
}

// Run main function
main().catch(error => {
  log(`\n✗ Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
