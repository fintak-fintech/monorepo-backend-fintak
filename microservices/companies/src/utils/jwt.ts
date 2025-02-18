import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKEN_KEY || 'defaultSecretKey';

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secretKey, { expiresIn: '8h' });
};
