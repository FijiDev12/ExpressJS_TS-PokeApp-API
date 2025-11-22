import { Request, Response } from 'express';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.API_KEY!, 'hex');
const iv = Buffer.from(process.env.API_IV!, 'hex');

export function aesEncrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return encrypted.toString('hex');
}

export function aesDecrypt(encryptedHex: string): string {
  const encryptedText = Buffer.from(encryptedHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
}

export const decryptData = async (req: Request, res: Response):Promise<void> =>{
    const { data } = req.body;
    res.status(200).json(JSON.parse(aesDecrypt(data)))
}

export const encryptData = async (req: Request, res: Response):Promise<void> =>{
    const { data } = req.body;
    res.status(200).json(JSON.parse(aesEncrypt(data)))
}
