import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verificarToken, TokenPayload } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      usuario?: TokenPayload;
    }
  }
}

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Missing or invalid authorization header", 401);
  }

  const [, token] = authHeader.split(" ");
  try {
    const payload = verificarToken(token);

    request.usuario = payload;

    next();
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
}
