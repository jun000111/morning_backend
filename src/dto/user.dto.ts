export interface UserRegisterDTO {
  userName: string;
  userGroup: string;
}

export interface UserResponseDTO {
  id: number;
  name: string;
  group: string;
  email: string;
  role: number;
  clerkId: string;
  createdAt: string;
}
