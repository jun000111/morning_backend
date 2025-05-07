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
        nutriSummary: {
          calories: 0,
          carbs: 0,
          fat: 0,
          sugar: 0,
          fiber: 0,
          sodium: 0,
          cholesterol: 0,
        },
        ingredients: [],
        ingredientsNutrition: [],
      };
    }

    const ingredientNutrition: IngredientNutrition = {
      id: row.ingredient_id,
      name: row.ingredient_name,
      calories: Number(row.calories),
      carbs: Number(row.carbs),
      fat: Number(row.fat),
      sugar: Number(row.sugar),
      fiber: Number(row.fiber),
      sodium: Number(row.sodium),
      cholesterol: Number(row.cholesterol),
    };

    acc[row.name].ingredientsNutrition.push(ingredientNutrition);
    acc[row.name].ingredients.push({
      id: ingredientNutrition.id,
      name: ingredientNutrition.name,
    });

    acc[row.name].nutriSummary.calories += ingredientNutrition.calories;
    acc[row.name].nutriSummary.carbs += ingredientNutrition.carbs;
    acc[row.name].nutriSummary.fat += ingredientNutrition.fat;
    acc[row.name].nutriSummary.sugar += ingredientNutrition.sugar;
    acc[row.name].nutriSummary.fiber += ingredientNutrition.fiber;
    acc[row.name].nutriSummary.sodium += ingredientNutrition.sodium;
    acc[row.name].nutriSummary.cholesterol += ingredientNutrition.cholesterol;

    return acc;
  }, {} as Record<string, PlatterIngredientNutrition>);

  return plattersInfo;
};
