import { Request, Response } from 'express';
import { pool } from '../config/db';
import { generateToken } from '../utils/jwt';
import { aesDecrypt, aesEncrypt } from './generalController';


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM func_login_user($1, $2)',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    console.log(rows[0])
    
    let token = generateToken({username: email, password:password})
    rows[0].Token = token
    const encryptedData = aesEncrypt(JSON.stringify(rows[0]));
    res.status(200).json({ data: encryptedData });
  } catch (err: any) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

export const get_session = async (req:Request,res:Response) => {
    const { session } = req.body
    // res.status(200).json({message: session})

    try {
        const { rows } = await pool.query(
            'SELECT * FROM get_user_by_session($1)',
            [session]
        );
        const encryptData = aesEncrypt(JSON.stringify(rows[0]))
        res.status(200).json({message: encryptData})
    } catch(err:any){
        res.status(500).json({message: err.message})
    }
}


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


