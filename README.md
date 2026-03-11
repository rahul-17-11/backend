# Loan Origination System — Node.js Backend

REST API backend for the Digital Loan Origination System.
Built with **Node.js**, **Express**, **MongoDB** (Mongoose), and **JWT** authentication.

## Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally on port 27017 (or provide a MongoDB Atlas URI)

### 2. Install & Run

```bash
npm install

# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Server starts at **http://localhost:5000**

### 3. Default Credentials (auto-seeded on first run)
| Username | Password   | Role    |
|----------|-----------|---------|
| admin    | admin123  | admin   |
| officer  | officer123| officer |

---

## Project Structure

```
loan-backend/
├── src/
│   ├── server.js                  # Express app entry point
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── seed.js                # Seeds default admin user
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt password)
│   │   ├── Application.js         # Loan application schema
│   │   └── Activity.js            # Activity/timeline schema
│   ├── controllers/
│   │   ├── authController.js      # Login logic + JWT generation
│   │   ├── applicationController.js  # CRUD for applications
│   │   └── activityController.js  # CRUD for activities
│   ├── routes/
│   │   ├── authRoutes.js          # POST /api/auth/login
│   │   └── applicationRoutes.js   # All /api/applications routes
│   └── middleware/
│       ├── auth.js                # JWT protect middleware
│       └── errorHandler.js        # Global error handler
├── .env                           # Environment variables
├── .env.example
└── package.json
```

---

## API Reference

All endpoints except `/api/auth/login` require:
```
Authorization: Bearer <token>
```

### Authentication

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | /api/auth/login   | Login, returns JWT token |

**Request body:**
```json
{ "username": "admin", "password": "admin123" }
```
**Response:**
```json
{ "token": "eyJ...", "user": { "id": "...", "username": "admin", "fullName": "...", "role": "admin" } }
```

---

### Loan Applications

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | /api/applications          | Fetch all loan applications    |
| POST   | /api/applications          | Create new loan application    |
| GET    | /api/applications/:id      | Get single application by ID   |
| PUT    | /api/applications/:id      | Update application             |
| DELETE | /api/applications/:id      | Delete application + activities|

**POST/PUT body fields:**
```json
{
  "applicantName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "company": "Acme Corp",
  "loanScheme": "Home Loan",
  "status": "Submitted"
}
```

**Status values:** `Submitted` | `Documents Verified` | `Under Review` | `Approved` | `Rejected`

---

### Activities

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| GET    | /api/applications/:id/activities      | Get all activities for application |
| POST   | /api/applications/:id/activities      | Log new activity                   |

**POST body:**
```json
{
  "type": "Call",
  "notes": "Discussed loan terms with applicant",
  "date": "2024-03-15",
  "nextActionDate": "2024-03-20"
}
```

**Type values:** `Call` | `Email` | `Meeting` | `Note`

---

## Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/loan_origination_db
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=24h
```

## AWS Deployment (EC2)

```bash
# Install Node.js on EC2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and install
git clone <your-repo>
cd loan-backend && npm install

# Set production env
cp .env.example .env
# Edit .env: set MONGODB_URI to Atlas URI or EC2 MongoDB
# Edit .env: set a strong JWT_SECRET

# Run with PM2 for process management
npm install -g pm2
pm2 start src/server.js --name loan-backend
pm2 save && pm2 startup
```
