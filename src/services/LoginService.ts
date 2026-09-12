import { sign, SignOptions } from "jsonwebtoken";
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

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new AppError("JWT secret is not defined", 500);
    }

    const expiresIn = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

    const token = sign({ id: user.id, role: user.role }, jwtSecret, {
      subject: user.id,
      expiresIn,
    });

    return token;
  }
}
