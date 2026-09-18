import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";
import { AppError } from "../utils/AppError";

export function roleMiddleware(...allowedRoles: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction): void => {
    if (!request.usuario) {
      throw new AppError("User not authenticated", 401);
    }

    if (!allowedRoles.includes(request.usuario.role)) {
      throw new AppError(
        "You do not have permission to access this resource",
        403,
      );
    }

    next();
  };
}
