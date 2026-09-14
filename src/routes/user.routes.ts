import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.get("/me", authMiddleware /* controller aqui depois */);

export { userRoutes };
