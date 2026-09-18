import { Request, Response, NextFunction } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { email, password } = request.body;

      const loginService = new LoginService();

      const token = await loginService.execute({ email, password });

      return response.json({ token });
    } catch (error) {
      next(error);
    }
  }
}
