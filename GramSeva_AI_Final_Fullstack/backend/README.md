# GramSeva AI Backend

Production-oriented starter backend built with Node.js, Express, PostgreSQL and Prisma.

## Features

- JWT authentication
- bcrypt password hashing
- Citizen, Admin, Department Officer and Super Admin roles
- Complaint creation and tracking
- Status history
- Department assignment
- Rule-based AI starter service
- Duplicate warning
- Priority and sentiment detection
- Admin analytics
- Pagination and filtering
- CORS, Helmet and request logging
- Prisma PostgreSQL schema

## 1. Prerequisites

Install:

- Node.js 20+
- PostgreSQL 14+

Create a database:

```sql
CREATE DATABASE gramseva_ai;
```

## 2. Configure

Copy `.env.example` to `.env` and update:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/gramseva_ai?schema=public"
JWT_SECRET="use_a_long_random_secret"
```

## 3. Install and initialize

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

API:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

## 4. Main API endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Complaints

```text
POST  /api/complaints
GET   /api/complaints/my
GET   /api/complaints/:complaintId
GET   /api/complaints
PATCH /api/complaints/:id/status
PATCH /api/complaints/:id/assign
```

### Admin

```text
GET /api/admin/analytics
GET /api/admin/departments
```

## Example registration

```json
{
  "name": "Test Citizen",
  "email": "citizen@example.com",
  "mobile": "9876543210",
  "password": "SecurePassword123",
  "village": "Example Village"
}
```

## Example complaint request

Use the JWT from login:

```http
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

```json
{
  "category": "STREETLIGHT",
  "description": "Streetlight near the bus stand is not working and the area is dark.",
  "village": "Example Village",
  "location": "Bus Stand Road",
  "latitude": 17.385,
  "longitude": 78.486
}
```

## Important deployment notes

This project intentionally contains **no demo complaints**.

Before public deployment:

1. Use a managed PostgreSQL database.
2. Set a strong JWT secret.
3. Restrict CORS to your deployed frontend domain.
4. Add cloud image storage such as Cloudinary or S3.
5. Add rate limiting.
6. Add email/OTP verification if required.
7. Create the first admin safely through a controlled admin provisioning process.
8. Never expose `.env` or database credentials.

## Connecting the existing frontend

Replace localStorage operations with `fetch()` requests to:

```js
const API_URL = "http://localhost:5000/api";
```

For protected endpoints:

```js
const token = localStorage.getItem("gramseva_token");

fetch(`${API_URL}/complaints/my`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```
