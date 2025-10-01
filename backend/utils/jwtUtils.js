const jwt = require('jsonwebtoken');

// JWT secret key - nên lưu trong environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'kidslock-secret-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Tạo JWT token cho user
 * @param {Object} user - Thông tin user
 * @param {number} user.ma_phu_huynh - Mã phụ huynh
 * @param {string} user.email_phu_huynh - Email phụ huynh
 * @param {boolean} user.la_admin - Phân quyền admin
 * @returns {string} - JWT token
 */
function generateToken(user) {
  const payload = {
    ma_phu_huynh: user.ma_phu_huynh,
    email_phu_huynh: user.email_phu_huynh,
    la_admin: user.la_admin,
    iat: Math.floor(Date.now() / 1000)
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'kidslock-api',
    audience: 'kidslock-client'
  });
}

/**
 * Xác thực JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} - Decoded payload hoặc null nếu invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'kidslock-api',
      audience: 'kidslock-client'
    });
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return null;
  }
}

/**
 * Middleware xác thực JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }

  // Thêm thông tin user vào request
  req.user = decoded;
  next();
}

/**
 * Middleware kiểm tra quyền admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
function requireAdmin(req, res, next) {
  if (!req.user || !req.user.la_admin) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
}

/**
 * Refresh JWT token
 * @param {string} token - Current JWT token
 * @returns {string|null} - New JWT token hoặc null nếu invalid
 */
function refreshToken(token) {
  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  // Tạo token mới với thông tin từ token cũ
  return generateToken({
    ma_phu_huynh: decoded.ma_phu_huynh,
    email_phu_huynh: decoded.email_phu_huynh,
    la_admin: decoded.la_admin
  });
}

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  requireAdmin,
  refreshToken,
  JWT_SECRET,
  JWT_EXPIRES_IN
};
