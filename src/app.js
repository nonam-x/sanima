import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middlewares/error.middleware.js';

// Route imports
import authRoutes from './modules/auth/auth.routes.js';
import seatRoutes from './modules/movie/seat.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Base route - serve the existing index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve assets
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/seats', seatRoutes);

// Error Handling
app.use(errorHandler);

export default app;
