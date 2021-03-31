import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      message: 'Access denied!',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
    req.user = verified;
  } catch (error) {
    res.status(400).json({
      error: 'Invalid token!',
    });
  }
};

export default auth;
