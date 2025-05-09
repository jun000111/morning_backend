import { UserResponseDTO } from "../dto/user.dto";
import { registerUserQuery } from "../database/queries/auth.queries";
import { mapUserRowToUser } from "../database/mappers/user.mapper";
import { ClerkUser } from "../models/user.model";
import { UserRegisterDTO } from "../dto/user.dto";

export const registerUser = async (
  clerkUser: ClerkUser,
  generatedUser: UserRegisterDTO
): Promise<UserResponseDTO> => {
  const userRow = await registerUserQuery(clerkUser, generatedUser);
  const user = mapUserRowToUser(userRow);
  return user;
};
