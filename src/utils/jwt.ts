import { sign, verify, SignOptions } from "jsonwebtoken";
import { UserRole } from "../entities/User";
import { AppError } from "./AppError";

export interface TokenPayload {
  id: string;
  role: UserRole;
}

export function gerarToken(payload: TokenPayload): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError(
      "JWT_SECRET is not defined in environment variables",
      500,
    );
  }
  const jwtExpiration = (process.env.JWT_EXPIRES_IN ||
    "1d") as SignOptions["expiresIn"];
  const options: SignOptions = {
    expiresIn: jwtExpiration,
  };

  return sign(payload, jwtSecret, options);
}

export function verificarToken(token: string): TokenPayload {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError(
      "JWT_SECRET is not defined in environment variables",
      500,
    );
  }
  return verify(token, jwtSecret) as TokenPayload;
}
