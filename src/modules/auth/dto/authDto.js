/**
 * Auth DTOs and Validation logic
 */

export const registerDto = (data) => {
  const { name, email, password } = data;
  const errors = [];

  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!password || password.length < 6)
    errors.push('Password must be at least 6 characters');

  return {
    isValid: errors.length === 0,
    errors,
    data: { name, email, password },
  };
};

export const loginDto = (data) => {
  const { email, password } = data;
  const errors = [];

  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  return {
    isValid: errors.length === 0,
    errors,
    data: { email, password },
  };
};
