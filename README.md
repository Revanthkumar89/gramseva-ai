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
