import jwt from 'jsonwebtoken';

interface Payload {
  username: string;
  password: string;
}

const secret = process.env.APT_JWT;

if (!secret) {
  throw new Error('JWT secret not defined in environment variables');
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};
