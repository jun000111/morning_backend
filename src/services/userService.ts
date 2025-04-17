import {pool} from "../config/db"
import {User} from "../models/User"

export const createUser = async (name:string,email:string,clerkId:string,role:number=2): Promise<User>=>{
    const result = await pool.query(
        `INSERT INTO users (name, email,role, clerk_id ) VALUES($1,$2,$3, $4) RETURNING *`,[name,email,role,clerkId]
    )
    return result.rows[0]
}