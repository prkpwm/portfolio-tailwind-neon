@echo off
echo Starting Portfolio Development Environment...

echo Starting Go Backend...
start cmd /k "cd backend && go run main.go"

timeout /t 3

echo Starting Angular Frontend...
start cmd /k "cd frontend && ng serve"

echo Both services are starting...
echo Frontend: http://localhost:4200
echo Backend: http://localhost:8080