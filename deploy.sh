#!/bin/bash

# Gravity Job Assistance Platform - Firebase Deployment Script
# Usage: ./deploy.sh

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   GRAVITY - FIREBASE DEPLOYMENT                              ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check Firebase CLI
echo -e "${BLUE}Step 1: Checking Firebase CLI...${NC}"
if ! command -v firebase &> /dev/null; then
    echo -e "${RED}✗ Firebase CLI not found${NC}"
    echo "Install with: npm install -g firebase-tools"
    exit 1
fi
echo -e "${GREEN}✓ Firebase CLI found${NC}"
echo ""

# Step 2: Check Node.js
echo -e "${BLUE}Step 2: Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi
NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION}${NC}"
echo ""

# Step 3: Install dependencies
echo -e "${BLUE}Step 3: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 4: Build project
echo -e "${BLUE}Step 4: Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build successful${NC}"
echo ""

# Step 5: Check Firebase authentication
echo -e "${BLUE}Step 5: Checking Firebase authentication...${NC}"
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠ Not authenticated with Firebase${NC}"
    echo "Running: firebase login"
    firebase login
fi
echo -e "${GREEN}✓ Firebase authenticated${NC}"
echo ""

# Step 6: Deploy to Firebase
echo -e "${BLUE}Step 6: Deploying to Firebase...${NC}"
firebase deploy --project gravi-multiple
if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Deployment failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Deployment successful${NC}"
echo ""

# Step 7: Show deployment info
echo -e "${BLUE}Step 7: Deployment Information${NC}"
echo -e "${GREEN}✓ Project deployed successfully!${NC}"
echo ""
echo "Live URL: https://gravi-multiple.web.app"
echo "Firebase Console: https://console.firebase.google.com/project/gravi-multiple"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Visit https://gravi-multiple.web.app"
echo "2. Test the registration form"
echo "3. Check admin dashboard"
echo "4. Monitor in Firebase Console"
echo ""
