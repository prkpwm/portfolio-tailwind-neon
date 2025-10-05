# Portfolio Backend

Go backend service for portfolio authentication.

## Setup

1. Install dependencies:
```bash
cd backend
go mod tidy
```

2. Run server:
```bash
go run main.go
```

Server runs on http://localhost:8080

## API Endpoints

### POST /api/verify-super-token
Verify super admin token

**Request:**
```json
{
  "token": "string"
}
```

**Response:**
```json
{
  "valid": boolean
}
```