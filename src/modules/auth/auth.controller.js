import * as authService from './auth.service.js';
import { registerDto, loginDto } from './dto/authDto.js';

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { isValid, errors, data } = registerDto(req.body);

    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const user = await authService.registerUser(data);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { isValid, errors, data } = loginDto(req.body);

    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    const result = await authService.loginUser(data.email, data.password);

    // Set refresh token in cookie (optional but recommended)
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken, // Sending in body for flexibility
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
    const result = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
    await authService.logoutUser(refreshToken);

    res.clearCookie('refreshToken');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};
