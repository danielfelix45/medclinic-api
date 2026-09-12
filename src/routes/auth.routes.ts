import { Router } from "express";
import { RegisterUserController } from "../controllers/RegisterUserController";
import { LoginController } from "../controllers/LoginController";

const authRoutes = Router();

const registerUserController = new RegisterUserController();
const loginController = new LoginController();

authRoutes.post("/register", registerUserController.handle);
authRoutes.post("/login", loginController.handle);

export { authRoutes };
