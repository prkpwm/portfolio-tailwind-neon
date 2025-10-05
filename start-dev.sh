#!/bin/bash

echo "Starting Portfolio Development Environment..."

echo "Starting Go Backend..."
cd backend && go run main.go &
BACKEND_PID=$!

sleep 3

echo "Starting Angular Frontend..."
cd ../frontend && ng serve &
FRONTEND_PID=$!

echo "Both services are starting..."
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:8080"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID