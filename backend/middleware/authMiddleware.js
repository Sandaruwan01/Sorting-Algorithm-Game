const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Protect routes
exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to the request object
    const query = 'SELECT id, username, email, system_role FROM users WHERE id = ?';
    db.query(query, [decoded.id], (err, results) => {
        if(err || results.length === 0) {
             return res.status(401).json({ message: 'Not authorized, user not found' });
        }
        req.user = results[0];
        next();
    });

  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Grant access to specific roles
exports.admin = (req, res, next) => {
  if (req.user && req.user.system_role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};
