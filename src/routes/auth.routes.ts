import { Router } from "express";
import { RegisterUserController } from "../controllers/RegisterUserController";

const authRoutes = Router();

const registerUserController = new RegisterUserController();

authRoutes.post("/register", registerUserController.handle);

export { authRoutes };
