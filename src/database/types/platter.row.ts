import { IngredientBaseRow } from "./ingredient.row";
import { NutritionBaseRow } from "./nutrition.row";

type PlatterBaseRow = {
  platter_id: number;
  platter_name: string;
  platter_description: string;
};

export type PlatterRow = PlatterBaseRow & IngredientBaseRow & NutritionBaseRow;
export type CalendarPlatterRow = PlatterRow & { date: string };
