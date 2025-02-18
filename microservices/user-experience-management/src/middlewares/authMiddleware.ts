import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import { getUserPermissions } from '../services/permissionsService';

dotenv.config()

const verifyPermissions = async (userId: string, requiredPermission: string) => {
  const userPermissions = await getUserPermissions(userId);
  
  return userPermissions?.includes(requiredPermission);
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
  requiredPermission = ''
) => {
  const userId = req.user.id;
  const authHeader = req.headers['authorization'];
  if (!userId) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  if (!authHeader) {
    return res.status(403).send('A token is required for authentication')
  }

	const token = authHeader.split(' ')[1];

  if (!token) {
    // logger.info('Token missing from authorization header');
    return res.status(403).json({ message: 'Token missing from authorization header' });
  }

  const hasPermissions = await verifyPermissions(userId, requiredPermission);
  if (!hasPermissions) {
    return res.status(401).json({ message: 'Forbidden' });
  }

  return next();
}
