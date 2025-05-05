export interface ClerkUser {
  username: string;
  emailAddress: string;
  clerkId: string;
}

export interface User {
  id: number;
  username: string;
  emailAddress: string;
  role: number;
  clerkId: string;
}
