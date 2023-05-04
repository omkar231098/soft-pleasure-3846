const express = require('express');
const router= express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateToken= require('../Validator/validator');
const User = require('../Models/user');
const BlacklistToken = require('../Models/blacklistToken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || '7d';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-secret-refresh';
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME || '14d';


router.post('/register', async (req, res) => {
    const {name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({ message: 'Invalid email or password' });
}

const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
  expiresIn: JWT_EXPIRATION_TIME,
});

const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
  expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
});

res.json({ accessToken, refreshToken });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server error' });
}
});


router.post('/logout', authenticateToken, async (req, res) => {
try {
const token = req.headers['authorization'].split(' ')[1];
console.log(token);
const blacklistedToken = new BlacklistToken({ token });
await blacklistedToken.save();
res.json({ message: 'Logged out successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server error' });
}
});

// router.post('/refresh', async (req, res) => {
// const refreshToken = req.body.refreshToken;

// if (!refreshToken) {
// return res.status(401).json({ message: 'Refresh token not found' });
// }

// try {
// const blacklistedToken = await BlacklistToken.findOne({ token: refreshToken });


// if (blacklistedToken) {
//   return res.status(403).json({ message: 'Refresh token has been revoked' });
// }

// jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//   if (err) {
//     return res.status(403).json({ message: 'Invalid refresh token' });
//   }

//   const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
//     expiresIn: JWT_EXPIRATION_TIME,
//   });

//   res.json({ accessToken });
// });
// } catch (error) {
// console.error(error);
// res.status(500).json({ message: 'Server error' });
// }
// });

// 


// 

router.get('/g', authenticateToken , (req, res) => {
    res.send('access')
})
// 

module.exports= router