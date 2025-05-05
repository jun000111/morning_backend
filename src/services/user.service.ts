import { User } from "../models/user.model";
import { getUserByClerkIdQuery } from "../database/queries/users.queries";
import { mapUserRowToUser } from "../database/mappers/user.mapper";

export const getUserByClerkId = async (
  clerkId: string
): Promise<User | null> => {
  const userRow = await getUserByClerkIdQuery(clerkId);
  let user;
  if (userRow) {
    user = mapUserRowToUser(userRow);
  } else {
    user = null;
  }

  return user;
};
