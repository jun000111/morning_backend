import { UserRow } from "../types/user.row";
import { UserResponseDTO } from "../../dto/user.dto";

export const mapUserRowToUser = (user: UserRow): UserResponseDTO => {
  return {
    id: user.id,
    name: user.user_name,
    group: user.user_group,
    email: user.email,
    role: user.role,
    clerkId: user.clerk_id,
    createdAt: user.created_at,
  };
};
