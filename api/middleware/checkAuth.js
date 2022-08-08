/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123');

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(401).json({
        message: 'You have no permissions',
      });
    }
  } else {
    return res.status(400).json({
      message: 'Error(checkAuth)',
    });
  }
};
