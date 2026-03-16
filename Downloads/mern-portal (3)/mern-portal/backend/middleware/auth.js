const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

/**
 * Protects admin routes.
 * Accepts token from:
 *   1. HTTP-only cookie  (cookie: token=...)   ← most secure
 *   2. Authorization header (Bearer <token>)   ← fallback for API testing
 */
module.exports = function authMiddleware(req, res, next) {
  // 1. Try cookie first
  let token = req.cookies?.token;

  // 2. Fallback: Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorised: no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // { username, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorised: invalid or expired token' });
  }
};
