# INSY7314 ICE Task 2 - Structured Backend API with Express

## Overview

A well-structured RESTful API built with Express.js for the Information Systems 3D module (INSY7314). This API demonstrates best practices in backend development including proper folder structure, input validation, CORS configuration, and centralized error handling.

**Assignment:** ICE Task 2 - Learning Unit 2 Theme 1 Activity  
**Module:** INSY7314 - Information Systems 3D  
**Institution:** Emeris Ruimsig

---

## Activity 2: Resource Change

**Changed from Gadgets to Cars** with 5 attributes (plus id):

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier (auto-generated) |
| `make` | string | Car manufacturer |
| `model` | string | Car model |
| `year` | number | Manufacturing year |
| `price` | number | Price in USD |
| `color` | string | Car color |

---

## Activity 3: Postman Testing

All routes were tested using Postman. Below are all endpoints tested with sample request bodies and expected responses.

---

## Features

- Route, Controller, Middleware architecture
- Input validation using Joi with custom error messages
- Controlled CORS configuration
- Central error handler
- In-memory data storage with auto-generated IDs
- CRUD operations for Cars resource

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| Joi | Input validation |
| CORS | Cross-Origin Resource Sharing |
| Dotenv | Environment variables |
| Nodemon | Development auto-reload |

---

## API Endpoints

### 1. Basic System Checks

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/` | Root route - Welcome message | 200 OK |
| GET | `/health` | Server health check | 200 OK |

### 2. Resource Retrieval (GET)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| GET | `/api/cars` | Fetch all cars | 200 OK |
| GET | `/api/cars/:id` | Fetch a car by ID | 200 OK / 404 Not Found |

### 3. Resource Creation (POST)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/api/cars` | Add a new car (with validation) | 201 Created / 400 Bad Request |

---

## Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| `make` | Required, string, min 1 character | "Make is required" / "Make must be at least 1 character" |
| `model` | Required, string, min 1 character | "Model is required" |
| `year` | Required, integer, >= 1886 | "Year must be 1886 or later (first car invented)" |
| `price` | Required, positive number | "Price must be greater than 0" |
| `color` | Required, string, min 1 character | "Color is required" |

---

## Sample Request Bodies (POST /api/cars)

### Success Cases - Add 5 New Cars

#### Car 1: Toyota Camry

```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2024,
  "price": 28500,
  "color": "Silver"
}
```

**Expected Response:** 201 Created

#### Car 2: Honda Civic

```json
{
  "make": "Honda",
  "model": "Civic",
  "year": 2024,
  "price": 24500,
  "color": "White"
}
```

**Expected Response:** 201 Created

#### Car 3: BMW X5

```json
{
  "make": "BMW",
  "model": "X5",
  "year": 2024,
  "price": 65000,
  "color": "Black"
}
```

**Expected Response:** 201 Created

#### Car 4: Mercedes-Benz C-Class

```json
{
  "make": "Mercedes-Benz",
  "model": "C-Class",
  "year": 2024,
  "price": 48000,
  "color": "Blue"
}
```

**Expected Response:** 201 Created

#### Car 5: Tesla Model 3

```json
{
  "make": "Tesla",
  "model": "Model 3",
  "year": 2024,
  "price": 45000,
  "color": "Red"
}
```

**Expected Response:** 201 Created

---

### Validation Error Test Cases

#### Test 1: Missing Make (Empty String)

```json
{
  "make": "",
  "model": "Camry",
  "year": 2024,
  "price": 28500,
  "color": "Silver"
}
```

**Expected Error:** "Make must be at least 1 character"  
**Status:** 400 Bad Request

#### Test 2: Invalid Year (Too Old - 1800)

```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 1800,
  "price": 28500,
  "color": "Silver"
}
```

**Expected Error:** "Year must be 1886 or later (first car invented)"  
**Status:** 400 Bad Request

#### Test 3: Invalid Price (Negative)

```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2024,
  "price": -1000,
  "color": "Silver"
}
```

**Expected Error:** "Price must be greater than 0"  
**Status:** 400 Bad Request

---

## Testing with Postman

All routes were tested using Postman. Below is a summary of all endpoints tested:

| # | Method | Endpoint | Status Expected |
|---|--------|----------|-----------------|
| 1 | GET | `http://localhost:4000/` | 200 OK |
| 2 | GET | `http://localhost:4000/health` | 200 OK |
| 3 | GET | `http://localhost:4000/api/cars` | 200 OK |
| 4 | GET | `http://localhost:4000/api/cars/c1` | 200 OK |
| 5 | POST | `http://localhost:4000/api/cars` | 201 Created |
| 6 | POST | `http://localhost:4000/api/cars` | 201 Created |
| 7 | POST | `http://localhost:4000/api/cars` | 201 Created |
| 8 | POST | `http://localhost:4000/api/cars` | 201 Created |
| 9 | POST | `http://localhost:4000/api/cars` | 201 Created |
| 10 | POST | `http://localhost:4000/api/cars` | 400 Bad Request |
| 11 | POST | `http://localhost:4000/api/cars` | 400 Bad Request |
| 12 | POST | `http://localhost:4000/api/cars` | 400 Bad Request |

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/secure-mern-app.git

# Navigate to the api folder
cd secure-mern-app/api

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server (development)
npm run dev

# Start the server (production)
npm start
```

---

## Project Structure

```
secure-mern-app/
└── api/
    ├── .env
    ├── .gitignore
    ├── index.js
    ├── package.json
    ├── controllers/
    │   └── carController.js
    ├── middleware/
    │   ├── corsConfig.js
    │   ├── errorHandler.js
    │   └── validateCarInput.js
    └── routes/
        └── carRoutes.js
```

---

## Screenshots

All Postman test screenshots are included in the submission document.

---

## Author

**Student Name:** [Botshelo Koketso Sekwena]  
**Student Number:** [ST10445866]  
**Module:** INSY7314 - Information Systems 3D  
**Institution:** Emeris Ruimsig

---
