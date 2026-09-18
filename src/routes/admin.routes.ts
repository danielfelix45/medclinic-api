import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { UserRole } from "../entities/User";

const adminRoutes = Router();

adminRoutes.get(
  "/ping",
  authMiddleware,
  roleMiddleware(UserRole.ADMINISTRADOR),
  (request, response) => {
    return response.status(200).json({
      message: "Admin access granted",
    });
  },
);

export { adminRoutes };
