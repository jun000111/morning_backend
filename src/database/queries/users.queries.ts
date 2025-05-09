import { pool } from "../../config/db";
import { HttpError } from "../../utils/HttpError";
import { UserRow } from "../types/user.row";

export const getUserByClerkIdQuery = async (
  clerkId: string
): Promise<UserRow | null> => {
  try {
    const result = await pool.query(
      `SELECT users.user_name,users.user_group, users.email, users.clerk_id 
        FROM users
        WHERE users.clerk_id = $1
        `,
      [clerkId]
    );

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (e: any) {
    console.error("error in getUserByClerkIdQuery", e);
    throw new HttpError("Failed to get user by clerkID", 500);
  }
};
