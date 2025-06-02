import { mapRowToBlockedCalendar } from "../database/mappers/calendar.mapper";
import {
  setCalendarBlockQuery,
  getCalendarBlockQuery,
} from "../database/queries/calendar.queries";
import { CalendarBlock } from "../models/calendar.model";
import { HttpError } from "../utils/HttpError";

export const setCalendarBlock = async (data: CalendarBlock) => {
  const { clerkId, date } = data;
  const TODAY = new Date();
  const isBlockable = new Date(
    TODAY.getFullYear(),
    TODAY.getMonth(),
    TODAY.getDay() + 14
  );
  if (new Date(date) <= isBlockable) {
    throw new HttpError("Date is not outside blockable dates", 400);
  }

  const formattedDate = TODAY.toLocaleDateString("en-CA");
  const currentBlocks = await getCalendarBlock({
    clerkId,
    date: formattedDate,
  });
  console.log(
    new Date(date).toLocaleString("default", { month: "short" }),
    currentBlocks.currentMonthQuota.month
  );
  const clickedMonth = new Date(date).toLocaleString("default", {
    month: "short",
  });

  if (
    currentBlocks.currentMonthQuota.quota >= 4 &&
    currentBlocks.currentMonthQuota.month === clickedMonth
  ) {
    throw new HttpError("Quota exceeded for current month", 400);
  }
  if (
    currentBlocks.nextMonthQuota.quota >= 4 &&
    currentBlocks.nextMonthQuota.month === clickedMonth
  ) {
    throw new HttpError("Quota exceeded for next month", 400);
  }

  const blockCalendarDateRow = await setCalendarBlockQuery(data);
  return blockCalendarDateRow;
};

export const getCalendarBlock = async (data: CalendarBlock) => {
  const blockCalendarDateRows = await getCalendarBlockQuery(data);
  const blockCalendarDates = mapRowToBlockedCalendar(blockCalendarDateRows);
  return blockCalendarDates;
};
