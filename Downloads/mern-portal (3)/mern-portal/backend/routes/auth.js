const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Returns: JWT in HTTP-only cookie + JSON { message, username }
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Compare against .env credentials (never stored in frontend)
  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword = password === process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Issue JWT
  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  // Set as HTTP-only cookie (not accessible by JavaScript → safe from XSS)
  res.cookie('token', token, {
    httpOnly: true,          // JS cannot read this cookie
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    sameSite: 'strict',      // CSRF protection
    maxAge: 8 * 60 * 60 * 1000, // 8 hours in ms
  });

  // Also return token in body so the React proxy setup works locally
  return res.json({ message: 'Login successful', username, token });
});

/**
 * POST /api/auth/logout
 * Clears the HTTP-only cookie
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
  return res.json({ message: 'Logged out' });
});

/**
 * GET /api/auth/verify
 * Returns 200 if token is valid, 401 if not
 * Used by frontend to check session on page refresh
 */
router.get('/verify', authMiddleware, (req, res) => {
  return res.json({ message: 'Valid', username: req.admin.username });
});

module.exports = router;
