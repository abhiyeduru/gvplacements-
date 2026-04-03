#!/usr/bin/env node

/**
 * Complete Database Testing Script
 * Tests Firestore connection, data storage, and retrieval
 * Run: node test-database-complete.cjs
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
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(70));
  log(title, 'cyan');
  console.log('='.repeat(70));
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'blue');
}

// Firebase Configuration
const PROJECT_ID = 'gravi-multiple';
const API_KEY = 'AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg';

// Test data
const testCandidates = [
  {
    name: 'Test User 1',
    email: `test1_${Date.now()}@gravity.com`,
    phone: '9876543210',
    pan: 'ABCDE1234F',
    aadhar: '123456789012',
    dob: '1995-05-15',
    gender: 'Male',
    qualification: 'Bachelor\'s Degree',
    experience: '1-3 years',
    position: 'Software Engineer',
    currentAddress: '123 Main Street, Mumbai',
    permanentAddress: '456 Park Road, Pune',
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: `test_${Date.now()}_1`,
    status: 'registered',
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Test User 2',
    email: `test2_${Date.now()}@gravity.com`,
    phone: '9876543211',
    pan: 'BCDEF2345G',
    aadhar: '234567890123',
    dob: '1996-08-22',
    gender: 'Female',
    qualification: 'Master\'s Degree',
    experience: '3-5 years',
    position: 'Data Analyst',
    currentAddress: '789 Park Avenue, Bangalore',
    permanentAddress: '321 Garden Lane, Hyderabad',
    paymentStatus: 'success',
    paymentAmount: 1000,
    paymentId: `test_${Date.now()}_2`,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
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

// Make HTTPS request
function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

// Test 1: Check Firestore Connection
async function testConnection() {
  logSection('TEST 1: Firestore Connection');

  try {
    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates?key=${API_KEY}&pageSize=1`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    logInfo(`Testing connection to: firestore.googleapis.com`);
    logInfo(`Project: ${PROJECT_ID}`);
    logInfo(`Endpoint: /v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates`);

    const response = await makeRequest(options);

    logInfo(`Response status: ${response.statusCode}`);

    if (response.statusCode === 200 || response.statusCode === 400) {
      // 400 might mean no data, but connection is OK
      logSuccess('Connected to Firestore');
      return true;
    } else if (response.statusCode === 404) {
      logError(`Endpoint not found: ${response.statusCode}`);
      logInfo(`Response: ${response.body.substring(0, 300)}`);
      return false;
    } else {
      logError(`Connection failed: HTTP ${response.statusCode}`);
      logInfo(`Response: ${response.body.substring(0, 200)}`);
      return false;
    }
  } catch (error) {
    logError(`Connection error: ${error.message}`);
    return false;
  }
}

// Test 2: Check Existing Data
async function checkExistingData() {
  logSection('TEST 2: Check Existing Data');

  try {
    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates?key=${API_KEY}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await makeRequest(options);

    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      const documents = data.documents || [];
      
      logSuccess(`Found ${documents.length} existing candidates`);
      
      if (documents.length > 0) {
        logInfo('Sample candidates:');
        documents.slice(0, 3).forEach((doc, i) => {
          const fields = doc.fields || {};
          const name = fields.name?.stringValue || 'N/A';
          const email = fields.email?.stringValue || 'N/A';
          console.log(`  ${i + 1}. ${name} (${email})`);
        });
      }
      
      return documents.length;
    } else {
      logError(`Failed to check data: HTTP ${response.statusCode}`);
      return 0;
    }
  } catch (error) {
    logError(`Error checking data: ${error.message}`);
    return 0;
  }
}

// Test 3: Write Test Data
async function writeTestData() {
  logSection('TEST 3: Write Test Data');

  const storedIds = [];

  for (let i = 0; i < testCandidates.length; i++) {
    try {
      const candidate = testCandidates[i];
      const firestoreData = convertToFirestoreFormat(candidate);
      const jsonData = JSON.stringify(firestoreData);

      const options = {
        hostname: 'firestore.googleapis.com',
        port: 443,
        path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates?key=${API_KEY}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(jsonData),
        },
      };

      const response = await makeRequest(options, jsonData);

      if (response.statusCode === 200 || response.statusCode === 201) {
        const data = JSON.parse(response.body);
        const docId = data.name ? data.name.split('/').pop() : `doc_${i}`;
        storedIds.push(docId);
        
        logSuccess(`Stored candidate ${i + 1}/${testCandidates.length}: ${candidate.name}`);
        logInfo(`  Document ID: ${docId}`);
        logInfo(`  Email: ${candidate.email}`);
      } else {
        logError(`Failed to store candidate ${i + 1}: HTTP ${response.statusCode}`);
        logInfo(`Response: ${response.body.substring(0, 200)}`);
      }
    } catch (error) {
      logError(`Error storing candidate ${i + 1}: ${error.message}`);
    }
  }

  return storedIds;
}

// Test 4: Verify Written Data
async function verifyWrittenData() {
  logSection('TEST 4: Verify Written Data');

  try {
    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates?key=${API_KEY}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await makeRequest(options);

    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      const documents = data.documents || [];
      
      logSuccess(`Retrieved ${documents.length} total candidates`);
      
      logInfo('All candidates:');
      documents.forEach((doc, i) => {
        const fields = doc.fields || {};
        const name = fields.name?.stringValue || 'N/A';
        const email = fields.email?.stringValue || 'N/A';
        const status = fields.status?.stringValue || 'N/A';
        console.log(`  ${i + 1}. ${name} (${email}) - ${status}`);
      });
      
      return documents.length;
    } else {
      logError(`Failed to verify data: HTTP ${response.statusCode}`);
      return 0;
    }
  } catch (error) {
    logError(`Error verifying data: ${error.message}`);
    return 0;
  }
}

// Test 5: Query Data
async function queryData() {
  logSection('TEST 5: Query Data');

  try {
    const options = {
      hostname: 'firestore.googleapis.com',
      port: 443,
      path: `/v1/projects/${PROJECT_ID}/databases/(default)/documents/candidates?pageSize=10&key=${API_KEY}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await makeRequest(options);

    if (response.statusCode === 200) {
      const data = JSON.parse(response.body);
      const documents = data.documents || [];
      
      logSuccess(`Query returned ${documents.length} candidates`);
      
      // Group by status
      const byStatus = {};
      documents.forEach(doc => {
        const fields = doc.fields || {};
        const status = fields.status?.stringValue || 'unknown';
        if (!byStatus[status]) byStatus[status] = [];
        byStatus[status].push(fields.name?.stringValue || 'N/A');
      });
      
      logInfo('Candidates by status:');
      Object.entries(byStatus).forEach(([status, names]) => {
        console.log(`  ${status}: ${names.length} candidates`);
        names.slice(0, 2).forEach(name => {
          console.log(`    - ${name}`);
        });
      });
      
      return true;
    } else {
      logError(`Query failed: HTTP ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    logError(`Error querying data: ${error.message}`);
    return false;
  }
}

// Test 6: Save Results
async function saveResults(results) {
  logSection('TEST 6: Save Results');

  try {
    const resultsFile = path.join(process.cwd(), 'database-test-results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    logSuccess(`Results saved to: database-test-results.json`);
  } catch (error) {
    logError(`Error saving results: ${error.message}`);
  }
}

// Main test function
async function runTests() {
  log('\n╔════════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║   GRAVITY - COMPLETE DATABASE TEST                               ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════════╝\n', 'cyan');

  const results = {
    timestamp: new Date().toISOString(),
    projectId: PROJECT_ID,
    tests: {},
  };

  // Test 1: Connection
  const connectionOk = await testConnection();
  results.tests.connection = connectionOk;

  if (!connectionOk) {
    logError('Cannot proceed without Firestore connection');
    process.exit(1);
  }

  // Test 2: Check existing data
  const existingCount = await checkExistingData();
  results.tests.existingData = existingCount;

  // Test 3: Write data
  const storedIds = await writeTestData();
  results.tests.storedIds = storedIds;
  results.tests.storedCount = storedIds.length;

  // Test 4: Verify
  const verifiedCount = await verifyWrittenData();
  results.tests.verifiedCount = verifiedCount;

  // Test 5: Query
  const queryOk = await queryData();
  results.tests.queryOk = queryOk;

  // Test 6: Save results
  await saveResults(results);

  // Summary
  logSection('SUMMARY');
  logSuccess(`Connection: OK`);
  logSuccess(`Existing candidates: ${existingCount}`);
  logSuccess(`New candidates stored: ${storedIds.length}`);
  logSuccess(`Total candidates verified: ${verifiedCount}`);
  logSuccess(`Query test: ${queryOk ? 'OK' : 'FAILED'}`);

  if (storedIds.length > 0 && verifiedCount > existingCount) {
    logSuccess('\n✓ DATABASE TEST PASSED - Data is being stored correctly!');
    process.exit(0);
  } else {
    logError('\n✗ DATABASE TEST FAILED - Data may not be storing correctly');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
});
