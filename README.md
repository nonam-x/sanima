# Sanima - Movie Booking System


![App Screenshot](./assets/show.png)

👉 **[Live](https://sanima.onrender.com/)**

## Overview


Sanima (formerly BookMyTicket) is a full-stack, premium movie booking application. It provides users with a seamless, highly engaging UI to discover trending movies, view seat availability, and securely book seats using a robust backend architecture.

## Key Features
- **Secure Authentication:** JWT-based stateless authentication with registration, login, token refresh, and logout functionalities.
- **Movie Discovery:** Fetch and display trending movies dynamically.
- **Seat Booking Engine:** Real-time seat retrieval and booking. Concurrent bookings and race conditions are mitigated.
- **User Dashboard:** Users can track their own past and upcoming bookings via a dedicated endpoint.
- **Modern Architecture:** Built with Node.js, Express, MongoDB (Mongoose), and secured using bcrypt and JSON Web Tokens. 
- **Modular Codebase:** Organized into clean, maintainable, domain-driven modules (`auth`, `booking`, `movie`).

## Tech Stack
**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- JWT (jsonwebtoken) for Auth
- bcrypt for Password Hashing
- cookie-parser, cors, dotenv

## Project Structure
```text
sanima/
├── assets/          # Static assets and media for frontend
├── src/
│   ├── config/      # Database & Environment configurations
│   ├── middlewares/ # Error handling & Auth middleware (protect routes)
│   ├── models/      # Mongoose Schemas (User, Movie, Show, Booking)
│   ├── modules/     # Domain-driven modules (auth, booking, movie)
│   ├── utils/       # Utility functions and helpers
│   ├── app.js       # Express app setup, middleware, and route mounting
│   └── server.js    # Application entry point & server initialization
├── index.html       # Single Page Application (SPA) entry point
└── package.json     # Project metadata and dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB (Local instance or MongoDB Atlas cluster URI)

### Installation
1. **Navigate to the project folder:**
   ```bash
   cd sanima
   ```

2. **Install dependencies:**
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
