import { CalendarPlatterDTO, PlatterDTO } from "../../dto/platter.dto";
import { NutritionBaseRow } from "../types/nutrition.row";
import {
  CalendarPlatterRow,
  platterIngredientRow,
  PlatterNutritionRow,
} from "../types/platter.row";

const setNutritions = (row: NutritionBaseRow) => {
  return {
    calories: Number(row.calories),
    carbs: Number(row.carbs),
    fat: Number(row.fat),
    sugar: Number(row.sugar),
    fiber: Number(row.fiber),
    sodium: Number(row.sodium),
    cholesterol: Number(row.cholesterol),
  };
};
const setBasePlatter = (
  platterNutritionRows: PlatterNutritionRow[],
  platterIngredientRows: platterIngredientRow[]
): Record<string, PlatterDTO> => {
  const plattersInfo: Record<string, PlatterDTO> = {};
  for (const row of platterNutritionRows) {
    const nutritions = setNutritions(row);
    if (!plattersInfo[row.platter_id]) {
      plattersInfo[row.platter_id] = {
        id: row.platter_id,
        name: row.platter_name,
        description: row.platter_description,
        nutritions: nutritions,
        ingredients: [],
      };
    }
  }

  for (const row of platterIngredientRows) {
    plattersInfo[row.platter_id].ingredients.push({
      id: row.ingredient_id,
      name: row.ingredient_name,
    });
  }
  return plattersInfo;
};

export const mapRowToPlatter = (
  platterNutritionRows: PlatterNutritionRow[],
  platterIngredientRows: platterIngredientRow[]
): PlatterDTO[] => {
  const plattersInfo = setBasePlatter(
    platterNutritionRows,
    platterIngredientRows
  );

  return Object.values(plattersInfo);
};

export const mapRowToCalendarPlatter = (
  calendarPlatterRows: CalendarPlatterRow[],
  platterIngredientRows: platterIngredientRow[]
): CalendarPlatterDTO[] => {
  const platterInfo = setBasePlatter(
    calendarPlatterRows,
    platterIngredientRows
  );
  const calendarPlatters: CalendarPlatterDTO[] = [];

  for (const platter of calendarPlatterRows) {
    const basePlatter = platterInfo[platter.platter_id];
    const date = new Date(platter.date).toLocaleDateString();
    if (basePlatter) {
      calendarPlatters.push({
        ...basePlatter,
        date: new Date(platter.date).toLocaleDateString("en-CA", {
          timeZone: "Asia/Singapore",
        }),
      });
    }
  }

  return calendarPlatters;
};
