import { IngredientBaseDTO } from "../../dto/ingredient.dto";
import { NutritionBaseDTO } from "../../dto/nutrition.dto";
import { CalendarPlatterDTO, PlatterDTO } from "../../dto/platter.dto";
import { CalendarPlatterRow, PlatterRow } from "../types/platter.row";

const createEmptyNutrition = (): NutritionBaseDTO => ({
  calories: 0,
  carbs: 0,
  fat: 0,
  sugar: 0,
  fiber: 0,
  sodium: 0,
  cholesterol: 0,
});

const addNutriSummary = (
  summary: NutritionBaseDTO,
  addition: NutritionBaseDTO
): NutritionBaseDTO => {
  summary.calories += addition.calories;
  summary.carbs += addition.carbs;
  summary.fat += addition.fat;
  summary.sugar += addition.sugar;
  summary.fiber += addition.fiber;
  summary.sodium += addition.sodium;
  summary.cholesterol += addition.cholesterol;
  return summary;
};

const buildNutritionFromRow = (
  row: PlatterRow
): IngredientBaseDTO & NutritionBaseDTO => ({
  id: row.ingredient_id,
  name: row.ingredient_name,
  calories: Number(row.calories),
  carbs: Number(row.carbs),
  fat: Number(row.fat),
  sugar: Number(row.sugar),
  fiber: Number(row.fiber),
  sodium: Number(row.sodium),
  cholesterol: Number(row.cholesterol),
});

function mapRowToPlatterBase<T extends object>(
  rows: (PlatterRow & T)[],
  getExtraAttributes: (row: PlatterRow & T) => T
): (PlatterDTO & T)[] {
  const plattersInfo: Record<string, PlatterDTO & T> = {};

  for (const row of rows) {
    if (!plattersInfo[row.platter_name]) {
      plattersInfo[row.platter_name] = {
        id: row.platter_id,
        name: row.platter_name,
        description: row.platter_description,
        ...getExtraAttributes(row),
        nutriSummary: createEmptyNutrition(),
        ingredients: [],
        ingredientsNutrition: {},
      };
    }

    const nutrition = buildNutritionFromRow(row);

    const platter = plattersInfo[row.platter_name];

    platter.nutriSummary = addNutriSummary(platter.nutriSummary, nutrition);
    platter.ingredients.push({ id: nutrition.id, name: nutrition.name });
    platter.ingredientsNutrition[nutrition.name] = nutrition;
  }

  return Object.values(plattersInfo);
}

export const mapRowToPlatter = (rows: PlatterRow[]): PlatterDTO[] => {
  return mapRowToPlatterBase(rows, () => ({}));
};

export const mapRowToCalendarPlatter = (
  rows: CalendarPlatterRow[]
): CalendarPlatterDTO[] => {
  const calendarPlatter = mapRowToPlatterBase(rows, (row) => ({
    date: row.date,
  }));
  calendarPlatter.map((platter) => {
    const date = new Date(platter.date);
    const formattedDate = date.toISOString().split("T")[0];
    platter.date = formattedDate;
  });
  return calendarPlatter;
};
