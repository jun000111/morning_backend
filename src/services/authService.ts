import { pool } from "../config/db";
import { User, UserRegisterDTO } from "../models/User";

export const registerUser = async ({
  name,
  email,
  clerkId,
}: UserRegisterDTO): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (name, email,role, clerk_id ) VALUES($1,$2,$3, $4) RETURNING *`,
    [name, email, 2, clerkId]
  );
  return result.rows[0];
};
