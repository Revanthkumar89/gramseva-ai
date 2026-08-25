# GramSeva AI

## Smart Village Civic Issue Reporting & Management Platform

GramSeva AI is a full-stack civic issue reporting platform that allows citizens to report village problems such as water issues, damaged roads, streetlight failures, garbage, and drainage problems.

Administrators can manage complaints, assign departments, update complaint status, and view analytics.

<img width="1870" height="863" alt="Screenshot 2026-08-25 115007" src="https://github.com/user-attachments/assets/edc81f19-5b4f-47fd-af75-4e8dbccc52ef" />


## Features

### Citizen Features

- Citizen registration and login
- Report village problems
- Select complaint category
- Add village and location
- Add complaint description
- Upload complaint photographs
- GPS location support
- Automatically generate complaint ID
- Track complaint status
- View complaint history
- Duplicate complaint warning
- AI-assisted complaint classification
- AI-assisted priority prediction
- Sentiment analysis
- Department recommendation

### Admin Features

- Admin authentication
- View complaints
- Search complaints
- Filter complaints
- Assign departments
- Update complaint status
- View complaint history
- View complaint details
- Complaint analytics
- Resolution rate
- Average resolution time
- Most common complaint category
- Village-wise complaint statistics

### Complaint Status

```text
OPEN
IN_PROGRESS
RESOLVED
Complaint Categories
WATER
ROAD_DAMAGE
STREETLIGHT
GARBAGE
DRAINAGE
OTHER
Technology Stack
Frontend
HTML5
CSS3
JavaScript
Responsive UI
Backend
Node.js
Express.js
JWT Authentication
bcrypt
REST API
Database
PostgreSQL
Prisma ORM
Security
JWT authentication
Password hashing using bcrypt
Helmet
CORS
Input validation using Zod
Project Structure
GramSeva_AI_Final_Fullstack/
│
├── frontend/
│   └── index.html
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── scripts/
│   │   └── create-admin.js
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── prisma.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── complaint.routes.js
│   │   │   ├── admin.routes.js
│   │   │   ├── public.routes.js
│   │   │   ├── upload.routes.js
│   │   │   └── health.routes.js
│   │   │
│   │   ├── services/
│   │   │   └── aiService.js
│   │   │
│   │   ├── utils/
│   │   │   └── complaintId.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── README.md
Requirements
Install the following software:
Node.js 20 or later
PostgreSQL 14 or later
VS Code
PostgreSQL Setup
Open PostgreSQL or pgAdmin and create the database:
CREATE DATABASE gramseva_ai;
Backend Setup
Open the VS Code terminal.
Move into the backend directory:
cd backend
Install dependencies:
npm install
Environment Variables
Create a file named:
.env
inside the backend folder.
Add:
PORT=5000

NODE_ENV=development

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/gramseva_ai?schema=public"

JWT_SECRET="CHANGE_THIS_TO_A_LONG_RANDOM_SECRET"

JWT_EXPIRES_IN="7d"

CORS_ORIGIN="http://127.0.0.1:5500,http://localhost:5500"
Replace:
YOUR_PASSWORD
with your PostgreSQL password.
Do not upload .env to GitHub.
Prisma Setup
Generate Prisma Client:
npx prisma generate
Create the database tables:
npx prisma migrate dev --name init
Seed the required departments:
npm run seed
The seed command creates departments only.
No fake complaint data is added.
Create Admin Account
Run:
npm run create-admin -- "GramSeva Admin" 9876543210 StrongPassword123
Example:
Name: GramSeva Admin
Mobile: 9876543210
Password: StrongPassword123
Role: SUPER_ADMIN
Keep your real admin password secure.
Start Backend
Run:
npm run dev
Backend will run at:
http://localhost:5000
Test Backend
Open:
http://localhost:5000/api/health
You should receive a response similar to:
{
  "status": "ok",
  "service": "GramSeva AI API",
  "database": "connected"
}
Start Frontend
Open a second VS Code terminal.
Move to:
cd frontend
If you don't already have a static server:
npx serve -l 5500
Open:
http://localhost:5500
API Endpoints
Authentication
Register
POST /api/auth/register
Example:
{
  "name": "Citizen Name",
  "mobile": "9876543210",
  "password": "SecurePassword123",
  "village": "Example Village"
}
Login
POST /api/auth/login
Example:
{
  "mobile": "9876543210",
  "password": "SecurePassword123"
}
Current User
GET /api/auth/me
Requires:
Authorization: Bearer YOUR_TOKEN
Complaint APIs
Create Complaint
POST /api/complaints
Get Citizen Complaints
GET /api/complaints/my
Track Complaint
GET /api/complaints/:complaintId
Admin Complaint List
GET /api/complaints
Update Status
PATCH /api/complaints/:id/status
Assign Department
PATCH /api/complaints/:id/assign
Public APIs
Public issue board:
GET /api/public/issues
Optional filters:
/api/public/issues?status=OPEN
/api/public/issues?category=ROAD_DAMAGE
Admin APIs
Analytics:
GET /api/admin/analytics
Departments:
GET /api/admin/departments
These endpoints require administrator authentication.
AI Features
The initial backend contains a rule-based AI service.
The service can identify:
Category
Water
Road Damage
Streetlight
Garbage
Drainage
Other
Priority
LOW
MEDIUM
HIGH
CRITICAL
Sentiment
Positive
Neutral
Negative
Department
Examples:
Water & Sanitation
Roads & Infrastructure
Electrical Maintenance
Sanitation
Drainage & Public Works
General Administration
The AI service is located at:
backend/src/services/aiService.js
It can later be replaced with a trained machine-learning model or external AI service.
Database
The application uses PostgreSQL through Prisma.
Main database models:
User
Department
Complaint
ComplaintHistory
Relationships:
User
 │
 └── Complaints
       │
       ├── Department
       │
       └── Complaint History
Image Upload
Complaint photos can be uploaded through:
POST /api/upload/complaint-photo
Maximum local upload size:
5 MB
Supported formats:
JPEG
PNG
WebP
For production deployment, replace local storage with a cloud storage provider such as:
Cloudinary
Amazon S3
Google Cloud Storage
Security
Before deploying publicly:
Change JWT_SECRET
Never commit .env
Use HTTPS
Restrict CORS to the production frontend domain
Use a managed PostgreSQL database
Add API rate limiting
Add email/OTP verification if required
Use cloud image storage
Configure secure cookies/token handling where appropriate
Back up the PostgreSQL database
Keep Node.js and dependencies updated
GitHub
Initialize Git:
git init
Add files:
git add .
Commit:
git commit -m "Initial GramSeva AI full-stack application"
Connect your GitHub repository:
git remote add origin YOUR_GITHUB_REPOSITORY_URL
Push:
git branch -M main
git push -u origin main
Never commit:
.env
node_modules/
uploads/
Deployment Architecture
For production:
                    ┌──────────────────┐
                    │    Citizens      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Frontend      │
                    │   HTML/CSS/JS    │
                    └────────┬─────────┘
                             │ HTTPS
                             ▼
                    ┌──────────────────┐
                    │ Node + Express   │
                    │      API         │
                    └────────┬─────────┘
                             │
                   ┌─────────┴─────────┐
                   ▼                   ▼
           ┌──────────────┐    ┌──────────────┐
           │  PostgreSQL  │    │ Cloud Storage│
           │   Database   │    │    Photos    │
           └──────────────┘    └──────────────┘
Important
The current project is a full-stack development foundation.
For actual public production deployment, the following should still be configured:
Production PostgreSQL
Production environment variables
HTTPS
Cloud image storage
Production frontend URL in CORS
API rate limiting
Production authentication configuration
Database backups
Monitoring/logging
Production AI service
