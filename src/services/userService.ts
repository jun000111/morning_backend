import { pool } from "../config/db";
import { User } from "../models/User";

export const getUserByClerkId = async (
  clerkId: string
): Promise<User | null> => {
  const result = await pool.query(
    `SELECT users.name, users.email, users.clerk_id 
        FROM users
        WHERE users.clerk_id = $1
        `,
    [clerkId]
  );

  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};
