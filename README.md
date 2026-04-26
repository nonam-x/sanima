# BookMyTicket Backend System

A Node.js + Express backend system for booking seats with a secure implementation utilizing PostgreSQL transactions and row-level locking.

## Setup Steps

1. **Prerequisites**: Ensure you have Node.js and PostgreSQL installed.
2. **Install Dependencies**: Run the following command to download all requirements:
   ```bash
   npm install
   ```
3. **Database Configuration**: 
   - Open `.env` and verify the `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` conform to your local PostgreSQL installation.
4. **Database Initialization**:
   - Run the SQL queries provided in `db/init.sql` in your Postgres database to create the `users` and `seats` tables, and to populate 20 available seats.
5. **Start Server**: 
   ```bash
   node index.js
   ```

## How Authentication Works

This application utilizes **JWT (JSON Web Tokens)** for secure, stateless authentication. 
- When a user signs up `/register` or logs in `/login`, an encrypted payload inside a JWT token is generated and returned to the client.
- The `authMiddleware.js` intercepts routes that require protection (like booking a seat), it inspects the request `Authorization: Bearer <token>` header, decodes the user information contained in it via the `JWT_SECRET`, and attaches the parsed `req.user` payload to the request itself.
- Passwords are securely hashed via `bcrypt` salt rounds prior to being saved to the database.

## API Endpoints

### 1. **Authentication**

**Register**
- **Endpoint**: `POST /api/auth/register`
- **Body**: `{ "name": "Alice", "email": "alice@gmail.com", "password": "password" }`
- **Response**: `201 Created`

**Login**
- **Endpoint**: `POST /api/auth/login`
- **Body**: `{ "email": "alice@gmail.com", "password": "password" }`
- **Response**: `200 OK` (Returns the JWT Bearer Token)

### 2. **Seats**

**Get All Seats**
- **Endpoint**: `GET /seats`
- **Response**: `200 OK` (Returns list of all seats)

**Book a Seat**
- **Endpoint**: `PUT /seats/:id`
- **Headers**: `Authorization: Bearer <Your_JWT_Token>`
- **Response**: `200 OK` (Returns updated booked seat). 
If the seat is already booked, transaction will fail cleanly and return `409 Conflict`.
