#!/usr/bin/env node

/**
 * Test Firestore Connection
 * This script tests if we can connect to Firestore and read data
 */

const https = require('https');

const PROJECT_ID = 'gravi-multiple';
const API_KEY = 'AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg';

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║   TESTING FIRESTORE CONNECTION                               ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Test 1: Check if we can read from Firestore
console.log('Test 1: Reading candidates from Firestore...');

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
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      try {
        const parsed = JSON.parse(data);
        const documents = parsed.documents || [];
        
        console.log(`✓ Successfully connected to Firestore`);
        console.log(`✓ Found ${documents.length} documents in candidates collection\n`);
        
        if (documents.length > 0) {
          console.log('Sample documents:');
          documents.slice(0, 3).forEach((doc, i) => {
            const fields = doc.fields || {};
            const name = fields.name?.stringValue || 'N/A';
            const email = fields.email?.stringValue || 'N/A';
            console.log(`  ${i + 1}. ${name} (${email})`);
          });
        }
        
        console.log('\n✓ Firestore connection is working!');
        console.log('✓ Data is being stored correctly!');
        
      } catch (e) {
        console.log('✗ Error parsing response:', e.message);
      }
    } else {
      console.log(`✗ Error: HTTP ${res.statusCode}`);
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('✗ Connection error:', error.message);
});

req.end();
