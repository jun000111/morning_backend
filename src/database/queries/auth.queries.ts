import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { ClerkUser } from "../../models/user.model";
import { HttpError } from "../../utils/HttpError";
import { UserRow } from "../types/user.row";

export const registerUserQuery = async (
  clerkUser: ClerkUser
): Promise<UserRow> => {
  try {
    const result: QueryResult<UserRow> = await pool.query(
      `INSERT INTO users (name, email,role, clerk_id ) VALUES($1,$2,$3, $4) RETURNING *`,
      [clerkUser.username, clerkUser.emailAddress, 2, clerkUser.clerkId]
    );
    return result.rows[0];
  } catch (e: any) {
    throw new HttpError("Error registering user", 500);
  }
};
