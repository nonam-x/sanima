# Sanima - Premium Movie Booking System

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

3. **Environment Variables:**
   Create a `.env` file in the root directory and configure the necessary variables (e.g., Database URI, JWT Secrets, Port).
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/sanima
   JWT_SECRET=your_jwt_secret_key
   # Add any other variables defined in your config
   ```

4. **Start the Server:**
   - **Development Mode** (with nodemon hot-reloading):
     ```bash
     npm run dev
     ```
   - **Production Mode**:
     ```bash
     npm start
     ```

## API Documentation

### Authentication (`/api/auth`)
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST   | `/register` | Register a new user | No |
| POST   | `/login` | Authenticate user & receive JWT | No |
| POST   | `/refresh` | Refresh an expired JWT | No |
| POST   | `/logout` | Invalidate token and logout user | Yes |

### Movies & Seats (`/seats`)
| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET    | `/` | Retrieve all available seats/shows | No |
| GET    | `/trending` | Retrieve trending movies | No |
| GET    | `/my-bookings`| View the current authenticated user's bookings | Yes |
| PUT    | `/:id` | Book a specific seat by its ID | Yes |

## Security & Best Practices
- **Password Security:** All passwords are salted and securely hashed using `bcrypt` prior to database storage.
- **Stateless Authentication:** The API employs JSON Web Tokens (JWT) for authorization.
- **Route Protection:** A dedicated `authMiddleware` intercepts protected routes, verifying the `Authorization: Bearer <token>` header, decoding the payload, and attaching the user object (`req.user`) before allowing access.
- **Error Handling:** Centralized error handling middleware formats and standardizes API error responses.

## License
This project is licensed under the ISC License.

**Book a Seat**
- **Endpoint**: `PUT /seats/:id`
- **Headers**: `Authorization: Bearer <Your_JWT_Token>`
- **Response**: `200 OK` (Returns updated booked seat). 
If the seat is already booked, transaction will fail cleanly and return `409 Conflict`.
