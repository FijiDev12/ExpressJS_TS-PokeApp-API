import { Request, Response } from 'express';
import { pool } from '../config/db';
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";


export const getAllRoles = async (req: Request, res: Response): Promise<void> => {
  // const city = req.query.city || 'All';
  //   console.log(city);
  try {
    const { rows } = await pool.query('SELECT * FROM roles');
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(500).json({Error: err.message});
    console.error('getAllRoles error:', err.message);
    res.status(500).json({ message: 'Failed to retrieve roles.' });
  }
};

