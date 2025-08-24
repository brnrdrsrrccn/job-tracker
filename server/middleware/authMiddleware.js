const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Move this to .env in production
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('Authorization header:', req.header('Authorization'));
  console.log('Extracted token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


module.exports = authMiddleware;
