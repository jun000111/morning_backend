import { pool } from "../../config/db";
import { HttpError } from "../../utils/HttpError";
import { PlatterIngredientNutritionRow } from "../types/platter.row";

export const getAllPlattersQuery = async (): Promise<
  PlatterIngredientNutritionRow[]
> => {
  try {
    const result = await pool.query<PlatterIngredientNutritionRow>(
      `SELECT platters.id,platters.name,platters.description, ingredients.id AS ingredient_id, ingredients.name AS ingredient_name ,

     nutritions.calories,nutritions.carbs,nutritions.fat,nutritions.fiber,nutritions.sodium,nutritions.cholesterol
    
     FROM PLATTERS 
    
     JOIN platter_ingredients 
     
     ON platters.id = platter_ingredients.platter_id

     JOIN ingredients

     ON platter_ingredients.ingredient_id = ingredients.id

     JOIN nutritions 

     ON ingredients.id = nutritions.ingredient_id 

    `
    );
    return result.rows;
  } catch (error) {
    throw new HttpError("Failed to fetch platters from the database ", 500);
  }
};
