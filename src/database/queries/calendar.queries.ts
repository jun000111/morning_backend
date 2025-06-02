import { pool } from "../../config/db";
import { CalendarBlock } from "../../models/calendar.model";
import { HttpError } from "../../utils/HttpError";
import { CalendarBlockRow } from "../types/calendar.row";
export const setCalendarBlockQuery = async (
  data: CalendarBlock
): Promise<CalendarBlockRow> => {
  const { clerkId, date } = data;

  try {
    const result = await pool.query<CalendarBlockRow>(
      `
      INSERT INTO user_blocked_date (user_id, blocked_date)
      SELECT id, $1
      FROM users
      WHERE clerk_id = $2
      RETURNING *;
      `,
      [date, clerkId]
    );

    return result.rows[0];
  } catch (err) {
    console.error("error in setBlockCalendarDateQuery", err);
    throw new HttpError("Failed to set block date in the database", 500);
  }
};

export const getCalendarBlockQuery = async (
  data: CalendarBlock
): Promise<CalendarBlockRow[]> => {
  const { clerkId, date } = data;

  try {
    const results = await pool.query(
      `
    SELECT users.id AS user_id, user_blocked_date.blocked_date
FROM users
JOIN user_blocked_date
  ON users.id = user_blocked_date.user_id
WHERE users.clerk_id = $2
  AND user_blocked_date.blocked_date >= DATE_TRUNC('month', $1::date)
  AND user_blocked_date.blocked_date <  DATE_TRUNC('month', $1::date) + INTERVAL '2 month';
    `,
      [date, clerkId]
    );
    return results.rows;
  } catch (e) {
    console.error("error in getCalendarBlockQuery", e);
    throw new HttpError("Failed to fetch blocked date in database", 500);
  }
};
