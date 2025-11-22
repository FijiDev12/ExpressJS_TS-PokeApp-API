import { Request, Response } from 'express';
import { pool } from '../config/db';
import { generateToken } from '../utils/jwt';
import { aesDecrypt, aesEncrypt } from './generalController';


export const addNewTask = async (req:Request, res:Response) => {
  let { data } = req.body;

  try {
    if (!data.title || !data.description || !data.priority || !data.status || !data.assignedId || !data.reporterId || !data.deadline || !data.projectId ){
      res.status(400).json({ error: 'Missing Field!' })
    } else{
      const { rows } = await pool.query(
        'SELECT * FROM create_task($1,$2,$3,$4,$5,$6,$7,$8)',
        [data.title, data.description, data.priority, data.status, data.assignedId, data.reporterId, data.deadline, data.projectId]
      )
      const encryptData = aesEncrypt(JSON.stringify(rows[0]));
      res.status(200).json({ data: encryptData })
    }

  } catch(err:any){
    res.status(500).json({ error: err.message })
  }
};




