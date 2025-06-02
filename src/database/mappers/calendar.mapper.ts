import { CalendarBlockDTO } from "../../dto/calendar.dto";
import { CalendarBlockRow } from "../types/calendar.row";

export const mapRowToBlockedCalendar = (
  blockCalendarDateRows: CalendarBlockRow[]
) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const nextMonth = (currentMonth + 1) % 12;

  const currentMonthString = today.toLocaleString("en-CA", { month: "short" });
  const nextMonthString = new Date(
    today.getFullYear(),
    today.getMonth() + 1
  ).toLocaleString("en-CA", { month: "short" });

  const blockedCalendars: CalendarBlockDTO = {
    user_id: blockCalendarDateRows[0].user_id,
    currentMonthQuota: { month: currentMonthString, quota: 0 },
    nextMonthQuota: { month: nextMonthString, quota: 0 },
    blockedDates: [],
  };

  blockCalendarDateRows.forEach((row) => {
    const month = new Date(row.blocked_date).getMonth();
    if (month === currentMonth) {
      blockedCalendars.currentMonthQuota.quota += 1;
    } else if (month === nextMonth) {
      blockedCalendars.nextMonthQuota.quota += 1;
    }
    const formattedDate = new Date(row.blocked_date).toLocaleDateString(
      "en-CA"
    );
    blockedCalendars.blockedDates.push(formattedDate);
  });
  return blockedCalendars;
};
