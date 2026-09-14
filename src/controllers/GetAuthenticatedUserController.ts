import { Request, Response } from "express";
import { GetAuthenticatedUserService } from "../services/GetAuthenticatedUserService";
import { AppError } from "../utils/AppError";

export class GetAuthenticatedUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const usuario = request.usuario;

    if (!usuario) {
      throw new AppError("User not authenticated", 401);
    }

    const getAuthenticatedUserService = new GetAuthenticatedUserService();

    const userId = usuario.id;
    const user = await getAuthenticatedUserService.execute(userId);
    const { password: _, ...userWithoutPassword } = user;
    return response.status(200).json(userWithoutPassword);
  }
}
