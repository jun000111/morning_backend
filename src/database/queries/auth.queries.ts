import { QueryResult } from "pg";
import { pool } from "../../config/db";
import { ClerkUser } from "../../models/user.model";
import { HttpError } from "../../utils/HttpError";
import { UserRow } from "../types/user.row";
import { UserRegisterDTO } from "../../dto/user.dto";

export const registerUserQuery = async (
  clerkUser: ClerkUser,
  generatedUser: UserRegisterDTO
): Promise<UserRow> => {
  try {
    const result: QueryResult<UserRow> = await pool.query(
      `INSERT INTO users (user_name,user_group, email,role, clerk_id ) VALUES($1,$2,$3, $4,$5) RETURNING *`,
      [
        generatedUser.userName,
        generatedUser.userGroup,
        clerkUser.emailAddress,
        2,
        clerkUser.clerkId,
      ]
    );
    return result.rows[0];
  } catch (e: any) {
    console.error("error in registerUserQuery", e);
    throw new HttpError("Error registering user", 500);
  }
};
