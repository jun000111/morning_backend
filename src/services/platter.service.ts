import {
  mapRowToPlatter,
  mapRowToCalendarPlatter,
} from "../database/mappers/platter.mappers";
import {
  getAllPlattersQuery,
  getCalendarPlattersQuery,
} from "../database/queries/platters.queries";
import { CalendarPlatterDTO, PlatterDTO } from "../dto/platter.dto";
import { HttpError } from "../utils/HttpError";

export const getAllPlatters = async (): Promise<PlatterDTO[]> => {
  try {
    const platterRows = await getAllPlattersQuery();

    const platterMap = mapRowToPlatter(platterRows);

    return platterMap;
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      throw err;
    }
    console.error("Unexpected error in getAllPlatters:", err);

    throw new HttpError("Failed to retrieve platters", 500);
  }
};

export const getCalendarPlatters = async (): Promise<CalendarPlatterDTO[]> => {
  try {
    const platterRows = await getCalendarPlattersQuery();

    const platterMap = mapRowToCalendarPlatter(platterRows);

    return platterMap;
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      throw err;
    }
    console.error("Unexpected error in getAllPlatters:", err);

    throw new HttpError("Failed to retrieve platters", 500);
  }
};
