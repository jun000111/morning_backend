import { pool } from "../../config/db";
import { HttpError } from "../../utils/HttpError";
import {
  CalendarPlatterRow,
  platterIngredientRow,
  PlatterNutritionRow,
} from "../types/platter.row";

const getPlatterIngredientRowSQL = `SELECT platters.id AS platter_id , platters.name AS platter_name , platters.description AS platter_description,

      ingredients.id AS ingredient_id , ingredients.name AS ingredient_name

      FROM platters
      
      JOIN platter_ingredients

      ON platters.id = platter_ingredients.platter_id  

      JOIN ingredients

      ON platter_ingredients.ingredient_id = ingredients.id
      
      `;

export const getAllPlattersQuery = async (): Promise<{
  platterNutritionRow: PlatterNutritionRow[];
  platterIngredientRow: platterIngredientRow[];
}> => {
  try {
    const platterNutritionRow = await pool.query<PlatterNutritionRow>(
      `SELECT * FROM platter_nutritions;`
    );
    const platterIngredientRow = await pool.query<platterIngredientRow>(
      getPlatterIngredientRowSQL
    );

    return {
      platterNutritionRow: platterNutritionRow.rows,
      platterIngredientRow: platterIngredientRow.rows,
    };
  } catch (error) {
    console.error("error in getAllPlattersQuery", error);
    throw new HttpError("Failed to fetch platters from the database ", 500);
  }
};

export const getCalendarPlattersQuery = async (): Promise<{
  calendarPlatterRow: CalendarPlatterRow[];
  platterIngredientRow: platterIngredientRow[];
}> => {
  try {
    const calendarPlatterRow = await pool.query<CalendarPlatterRow>(`
      SELECT calendar_platters.date ,

      platter_nutritions.* 
      
      FROM platter_nutritions

      JOIN calendar_platters

      ON platter_nutritions.platter_id = calendar_platters.platter_id

      WHERE calendar_platters.date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '1 month'

      ORDER BY calendar_platters.date
      
      ;
`);

    const platterIngredientRow = await pool.query<platterIngredientRow>(
      getPlatterIngredientRowSQL
    );

    return {
      calendarPlatterRow: calendarPlatterRow.rows,
      platterIngredientRow: platterIngredientRow.rows,
    };
  } catch (error) {
    console.error("error in getAllPlattersQuery", error);
    throw new HttpError("Failed to fetch platters from the database ", 500);
  }
};
