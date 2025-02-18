import dotenv from 'dotenv';
dotenv.config({ path: '/workspaces/fintak/.env' }); // Specify the path to the .env file
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKEN_KEY || 'defaultSecretKey';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing from authorization header' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded; // Type assertion to avoid TypeScript error
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  return next();
};
