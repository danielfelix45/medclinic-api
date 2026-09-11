import { Request, Response } from "express";
import { RegisterUserService } from "../services/RegisterUserService";

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const registerUserService = new RegisterUserService();
    const user = await registerUserService.execute({ name, email, password });

    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}
