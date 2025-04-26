import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import platterRoutes from "./routes/platterRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/platters", platterRoutes);

app.use(errorHandler);
export default app;
