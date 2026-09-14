import { gerarToken } from "../utils/jwt";
import { compare } from "bcryptjs";
import { LoginDTO } from "../dtos/LoginDTO";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

export class LoginService {
  private userRepository = new UserRepository();

  async execute(data: LoginDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Email or password is incorrect", 401);
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password is incorrect", 401);
    }

    const token = gerarToken({
      id: user.id,
      role: user.role,
    });

    return token;
  }
}
