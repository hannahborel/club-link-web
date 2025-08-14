#!/bin/bash

echo "🚀 Starting Club Link Services..."
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    kill $API_PID $WEB_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start API server (port 3000)
echo "📡 Starting API server on port 3000..."
cd club-link-api
npm run dev &
API_PID=$!
cd ..

# Wait a moment for API to start
sleep 3

# Start Web server (port 3001)
echo "🌐 Starting Web server on port 3001..."
cd club-link-web
PORT=3001 npm run dev &
WEB_PID=$!
cd ..

echo ""
echo "✅ Services started successfully!"
echo "📡 API: http://localhost:3000"
echo "🌐 Web: http://localhost:3001"
echo "🧪 Test: http://localhost:3001/test-api"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait $API_PID $WEB_PID
