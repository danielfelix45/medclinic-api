import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { User } from "../entities/User";
import { AppError } from "../utils/AppError";

export class RegisterUserService {
  private userRepository = new UserRepository();

  async execute(data: RegisterUserDTO): Promise<User> {
    if (!data.name || !data.email || !data.password) {
      throw new AppError("Name, email and password are required", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      throw new AppError("Invalid email format", 400);
    }
    // regras de cadastro entram aqui
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const hashedPassword = await hash(data.password, 8);

    const user = new User();

    user.name = data.name;
    user.email = data.email;
    user.password = hashedPassword;

    return this.userRepository.create(user);
  }
}
