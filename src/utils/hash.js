import bcrypt from 'bcrypt';

/**
 * Hash Password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare Password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from DB
 * @returns {Promise<boolean>} Match result
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
