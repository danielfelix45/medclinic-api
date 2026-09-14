import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { GetAuthenticatedUserController } from "../controllers/GetAuthenticatedUserController";

const userRoutes = Router();
const getAuthenticatedUserController = new GetAuthenticatedUserController();

userRoutes.get("/me", authMiddleware, getAuthenticatedUserController.handle);

export { userRoutes };
