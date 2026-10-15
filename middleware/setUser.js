import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const setUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (user) req.user = user;
      next();
    });
  } else {
    next();
  }
};

export default setUser;
