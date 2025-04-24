import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? "3000",
  DATABASE_URL: process.env.DATABASE_URL!,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
  CLERK_JWT_KEY: process.env.CLERK_JWT_KEY!,
};

// Optional runtime guard
if (!ENV.DATABASE_URL) {
  throw new Error("Missing required environment variable: DATABASE_PW");
}
