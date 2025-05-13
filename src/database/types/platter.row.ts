import { IngredientBaseRow } from "./ingredient.row";
import { NutritionBaseRow } from "./nutrition.row";

type PlatterBaseRow = {
  platter_id: string;
  platter_name: string;
  platter_description: string;
};

export type PlatterNutritionRow = PlatterBaseRow & NutritionBaseRow;
export type platterIngredientRow = PlatterBaseRow & IngredientBaseRow;
export type CalendarPlatterRow = PlatterNutritionRow & { date: string };
