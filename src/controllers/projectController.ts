import { Request, Response } from 'express';
import { pool } from '../config/db';
import { generateToken } from '../utils/jwt';
import { aesDecrypt, aesEncrypt } from './generalController';


export const addNewProject = async (req:Request, res:Response) => {
  let { data } = req.body;

  try {
    if (!data.projectName || !data.description || !data.goals || !data.startDate || !data.endDate || !data.status || !data.createdBy ){
      res.status(400).json({ error: 'Missing Field!' })
    } else{
      const { rows } = await pool.query(
        'SELECT * FROM add_new_project($1,$2,$3,$4,$5,$6,$7)',
        [data.projectName, data.description, data.goals, data.startDate, data.endDate, data.status, data.createdBy]
      )
      const encryptData = aesEncrypt(JSON.stringify(rows[0]));
      res.status(200).json({ data: encryptData })
    }

  } catch(err:any){
    res.status(500).json({ error: err.message })
  }
};

export const updateProject = async (req:Request, res:Response) => {
  let { data } = req.body;

  try {
    if ( !data.projectId || !data.projectName || !data.description || !data.goals || !data.startDate || !data.endDate || !data.status ){
      res.status(400).json({ error: 'Missing Field!' })
    } else {
      const { rows } = await pool.query(
        'SELECT * FROM update_project($1,$2,$3,$4,$5,$6,$7)',
        [data.projectId, data.projectName, data.description, data.goals, data.startDate, data.endDate, data.status]
      )
      const encryptData = aesEncrypt(JSON.stringify(rows[0]));
      res.status(200).json({ data: encryptData })
    }
  } catch (err:any) {
    res.status(500).json({ error: err.message })
  }
}


