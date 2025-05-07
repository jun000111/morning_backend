import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import platterRoutes from "./routes/platter.routes";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/platters", platterRoutes);

app.use(errorHandler);
export default app;
