import User from '../../models/User.js';
import { hashPassword, comparePassword } from '../../utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../../utils/jwt.js';

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

/**
 * Login user and generate tokens
 */
export const loginUser = async (email, password) => {
  // Find user with password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token in DB
  user.refreshTokens.push(refreshToken);
  await user.save();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Refresh Access Token
 */
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token required');

  // Verify token
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('FATAL ERROR: REFRESH_TOKEN_SECRET is not defined in environment variables.');
  }
  const decoded = verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decoded) throw new Error('Invalid refresh token');

  // Find user
  const user = await User.findById(decoded.id);
  if (!user || !user.refreshTokens.includes(refreshToken)) {
    throw new Error('Invalid refresh token');
  }

  // Generate new access token
  const newAccessToken = generateAccessToken(user);

  return { accessToken: newAccessToken };
};

/**
 * Logout user (revoke refresh token)
 */
export const logoutUser = async (refreshToken) => {
  const user = await User.findOne({ refreshTokens: refreshToken });
  if (user) {
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
    await user.save();
  }
};
