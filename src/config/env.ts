import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ?? "3000",
  DATABASE_URL: process.env.DATABASE_URL!,
};

// Optional runtime guard
if (!ENV.DATABASE_URL) {
  throw new Error("Missing required environment variable: DATABASE_PW");
}
