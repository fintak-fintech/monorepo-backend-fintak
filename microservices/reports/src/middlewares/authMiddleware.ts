import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  if (!authHeader) {
    return res.status(403).send('A token is required for authentication')
  }

	const token = authHeader.split(' ')[1];

  if (!token) {
    // logger.info('Token missing from authorization header');
    return res.status(401).json({ message: 'Token missing from authorization header' });
  }

  return next()
}
