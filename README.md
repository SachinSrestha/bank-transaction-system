# Bank Transaction System (Backend)

Lightweight backend service for managing users, accounts, and transactions. Built with Node.js, Express and MongoDB for a simple bank transaction system API.

## Live Deployment

The project is deployed at:

https://bank-transaction-system-5n4t.onrender.com/

Use this URL as the base for all API requests.

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

## How to Test the Deployed API

You can test the live deployment without running the project locally.

1. Open `https://bank-transaction-system-5n4t.onrender.com/` in a browser.
   - You should see the response `Server up and running`.
2. Use Postman, Thunder Client, curl, or any API client to call the live endpoints.
3. Start by testing authentication, then use the returned JWT for protected routes.

Example: Check the live server

```bash
curl https://bank-transaction-system-5n4t.onrender.com/
```

Example: Register a user on the deployed API

```bash
curl -X POST https://bank-transaction-system-5n4t.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"a@example.com","password":"secret"}'
```

Example: Log in and use the token for protected routes

```bash
curl -X POST https://bank-transaction-system-5n4t.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@example.com","password":"secret"}'
```

Then send the token with protected requests:

```bash
curl -X GET https://bank-transaction-system-5n4t.onrender.com/api/accounts \
  -H "Authorization: Bearer <TOKEN>"
```

If you are testing from a frontend or API client, point requests to the deployed base URL instead of `localhost`.

## API Overview

Key routes (see `src/routes`):

- Authentication: `POST /api/auth/register`, `POST /api/auth/login`
- Accounts: `GET /api/accounts`, `POST /api/accounts` (protected)
- Transactions: `GET /api/transactions`, `POST /api/transactions` (protected)

## Notes
- Check `src/config/db.js` for DB connection details.
- Customize validation and business rules in `src/controllers`.
- Email functionality uses `nodemailer`; ensure SMTP env vars are set when enabled.
