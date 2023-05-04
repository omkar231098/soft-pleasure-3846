
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const BlacklistToken = require('../Models/blacklistToken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';

const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const blacklistedToken = await BlacklistToken.findOne({token});


    if (blacklistedToken) {
      return res.status(403).json({ message: 'token has been blacklisted' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
      //  console.log(err.message)
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  };

  module.exports = authenticateToken