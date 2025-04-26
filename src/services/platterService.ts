import { pool } from "../config/db";
import { Platter } from "../models/Platter";

export const getAllPlatters = async (): Promise<Platter[]> => {
  const result = await pool.query(`SELECT * FROM PLATTERS `);
  return result.rows;
};
