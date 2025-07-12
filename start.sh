#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚌 Perdoor Bus Timing - Starting Application${NC}"
echo ""

# Check if MongoDB is running
echo -e "${YELLOW}Checking MongoDB status...${NC}"
if pgrep mongod > /dev/null; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${RED}❌ MongoDB is not running${NC}"
    echo -e "${YELLOW}Starting MongoDB...${NC}"
    
    # Try to start MongoDB
    if command -v mongod &> /dev/null; then
        mongod --fork --logpath /var/log/mongod.log --dbpath /data/db &
        sleep 2
        if pgrep mongod > /dev/null; then
            echo -e "${GREEN}✅ MongoDB started successfully${NC}"
        else
            echo -e "${RED}❌ Failed to start MongoDB automatically${NC}"
            echo -e "${YELLOW}Please start MongoDB manually: mongod${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ MongoDB not found. Please install MongoDB first.${NC}"
        exit 1
    fi
fi

echo ""

# Check if dependencies are installed
echo -e "${YELLOW}Checking dependencies...${NC}"

if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    cd frontend && npm install && cd ..
fi

echo -e "${GREEN}✅ Dependencies are ready${NC}"
echo ""

# Start the application
echo -e "${BLUE}🚀 Starting the application...${NC}"
echo -e "${YELLOW}Backend will run on: http://localhost:5000${NC}"
echo -e "${YELLOW}Frontend will run on: http://localhost:3000${NC}"
echo ""
echo -e "${GREEN}Press Ctrl+C to stop the application${NC}"
echo ""

# Use concurrently if available, otherwise start manually
if command -v concurrently &> /dev/null; then
    npm run dev
else
    echo -e "${YELLOW}Starting backend server...${NC}"
    cd backend && npm start &
    BACKEND_PID=$!
    
    echo -e "${YELLOW}Starting frontend server...${NC}"
    cd frontend && npm start &
    FRONTEND_PID=$!
    
    # Wait for both processes
    wait $BACKEND_PID $FRONTEND_PID
fi