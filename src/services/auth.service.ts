import { User } from "../models/user.model";
import { registerUserQuery } from "../database/queries/auth.queries";
import { mapUserRowToUser } from "../database/mappers/user.mapper";
import { ClerkUser } from "../models/user.model";

export const registerUser = async (clerkUser: ClerkUser): Promise<User> => {
  const userRow = await registerUserQuery(clerkUser);
  const user = mapUserRowToUser(userRow);
  return user;
};
