const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = (req, res) => {
  const { username, email, password, date_of_birth, user_role } = req.body;

  if (!username || !email || !password || !date_of_birth || !user_role) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        const newUser = {
          username,
          email,
          password_hash: hash,
          date_of_birth,
          user_role
        };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) throw err;
          res.status(201).json({
            id: result.insertId,
            username,
            email
          });
        });
      });
    });
  });
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const payload = { id: user.id };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.username,
              email: user.email,
              role: user.system_role
            }
          });
        }
      );
    });
  });
};
