import {
  PlatterIngredientNutrition,
  IngredientNutrition,
} from "../../models/platter.model";
import { PlatterIngredientNutritionRow } from "../types/platter.row";

export const mapRowToPlatterIngredientNutrition = (
  rows: PlatterIngredientNutritionRow[]
): Record<string, PlatterIngredientNutrition> => {
  const plattersInfo = rows.reduce((acc, row) => {
    if (!acc[row.name]) {
      acc[row.name] = {
        id: row.id,
        name: row.name,
        description: row.description,
        ingredients: [],
      };
    }

    const ingredientNutrition: IngredientNutrition = {
      id: row.ingredient_id,
      name: row.ingredient_name,
      calories: row.calories,
      carbs: row.carbs,
      fat: row.fat,
      sugar: row.sugar,
      fiber: row.fiber,
      sodium: row.sodium,
      cholesterol: row.cholesterol,
    };

    acc[row.name].ingredients.push(ingredientNutrition);

    return acc;
  }, {} as Record<string, PlatterIngredientNutrition>);

  return plattersInfo;
};
