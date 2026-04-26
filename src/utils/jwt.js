import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Generate Access Token
 * @param {Object} user - User object
 * @returns {string} Access Token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET || 'access_secret_key',
    { expiresIn: '15m' } // Short-lived access token
  );
};

/**
 * Generate Refresh Token
 * @param {Object} user - User object
 * @returns {string} Refresh Token
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key',
    { expiresIn: '7d' } // Long-lived refresh token
  );
};

/**
 * Verify Token
 * @param {string} token - JWT token
 * @param {string} secret - Secret key
 * @returns {Object} Decoded payload
 */
export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
