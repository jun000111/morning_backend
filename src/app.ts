import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import platterRoutes from "./routes/platter.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/platters", platterRoutes);

app.use(errorHandler);
export default app;
