import { pool } from "../../config/db";
import { HttpError } from "../../utils/HttpError";
import { CalendarPlatterRow, PlatterRow } from "../types/platter.row";

export const getAllPlattersQuery = async (): Promise<PlatterRow[]> => {
  try {
    const result = await pool.query<PlatterRow>(
      `SELECT platters.id AS platter_id,platters.name AS platter_name,platters.description AS platter_description, 
      
      ingredients.id AS ingredient_id, ingredients.name AS ingredient_name ,

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
    console.error("error in getAllPlattersQuery", error);
    throw new HttpError("Failed to fetch platters from the database ", 500);
  }
};

export const getCalendarPlattersQuery = async (): Promise<
  CalendarPlatterRow[]
> => {
  try {
    const result = await pool.query<CalendarPlatterRow>(`
  SELECT 
    platters.id AS platter_id,
    platters.name AS platter_name,
    platters.description AS platter_description,
    ingredients.id AS ingredient_id,
    ingredients.name AS ingredient_name,
    nutritions.calories,
    nutritions.carbs,
    nutritions.fat,
    nutritions.fiber,
    nutritions.sodium,
    nutritions.cholesterol,
    calendar_platters.date 
  FROM platters
  JOIN platter_ingredients 
    ON platters.id = platter_ingredients.platter_id
  JOIN ingredients
    ON platter_ingredients.ingredient_id = ingredients.id
  JOIN nutritions 
    ON ingredients.id = nutritions.ingredient_id
  JOIN calendar_platters
    ON platters.id = calendar_platters.platter_id
  WHERE calendar_platters.date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '21 days'
  ORDER BY calendar_platters.date ASC
`);

    return result.rows;
  } catch (error) {
    console.error("error in getAllPlattersQuery", error);
    throw new HttpError("Failed to fetch platters from the database ", 500);
  }
};
