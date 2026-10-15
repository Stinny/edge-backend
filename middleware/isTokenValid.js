import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const isTokenValid = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json('Access denied');

  jwt.verify(token, process.env.JWT_SEC, (err) => {
    if (err) return res.status(403).json('Access denied');
    next();
  });
};

export default isTokenValid;
