import { mapRowToPlatterIngredientNutrition } from "../database/mappers/platter.mappers";
import { getAllPlattersQuery } from "../database/queries/platters.queries";
import { PlatterIngredientNutrition } from "../models/platter.model";
import { HttpError } from "../utils/HttpError";

export const getAllPlatters = async (): Promise<
  Record<string, PlatterIngredientNutrition>
> => {
  try {
    const platterRows = await getAllPlattersQuery();

    const platterMap = mapRowToPlatterIngredientNutrition(platterRows);

    return platterMap;
  } catch (err: unknown) {
    if (err instanceof HttpError) {
      throw err;
    }
    console.error("Unexpected error in getAllPlatters:", err);

    throw new HttpError("Failed to retrieve platters", 500);
  }
};
