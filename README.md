# Bank Transaction System (Backend)

Lightweight backend service for managing users, accounts, and transactions. Built with Node.js, Express and MongoDB for a simple bank transaction system API.

## Features
- User registration, login (JWT authentication)
- Account management (create, view)
- Transactions ledger (create, list, balance tracking)
- Email service hooks (nodemailer)

## Repository Structure

- `server.js` - App entry point
- `src/app.js` - Express app setup
- `src/config/db.js` - MongoDB connection
- `src/routes/` - Route definitions
- `src/controllers/` - Request handlers
- `src/models/` - Mongoose models
- `src/middleware/auth.middleware.js` - JWT auth middleware
- `src/services/email.service.js` - Email helpers

## Prerequisites
- Node.js 16+ and npm
- MongoDB instance (local or Atlas)

## Environment Variables
Create a `.env` file in the project root with the following values:

- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default 3000)
- `JWT_SECRET` - Secret for signing JWTs
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - SMTP credentials (optional, for email service)

## Install & Run

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
# or for development with nodemon
npx nodemon server.js
```

The app listens on `http://localhost:<PORT>`.

## API Overview

Key routes (see `src/routes`):

- Authentication: `POST /api/auth/register`, `POST /api/auth/login`
- Accounts: `GET /api/accounts`, `POST /api/accounts` (protected)
- Transactions: `GET /api/transactions`, `POST /api/transactions` (protected)

Example: Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"a@example.com","password":"secret"}'
```

Example: Create Transaction (requires JWT)

```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"fromAccount":"<id>","toAccount":"<id>","amount":100,"description":"Transfer"}'
```

## Notes
- Check `src/config/db.js` for DB connection details.
- Customize validation and business rules in `src/controllers`.
- Email functionality uses `nodemailer`; ensure SMTP env vars are set when enabled.

## Next steps
- Add README examples for each route or Postman collection
- Add tests and setup a `test` script in `package.json`

---

If you'd like, I can add a Postman collection or update `package.json` scripts next.
