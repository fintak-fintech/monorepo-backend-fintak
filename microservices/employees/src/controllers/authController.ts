import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';

export const loginController = (req: Request, res: Response) => {
  const { username, password } = req.body;

  console.log('username', username);
  // Replace with actual user validation logic
  if (username === 'admin' && password === 'password') {
    const token = generateToken({ username });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};