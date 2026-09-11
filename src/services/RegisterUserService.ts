import { hash } from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import { User } from "../entities/User";
import { AppError } from "../utils/AppError";

export class RegisterUserService {
  private userRepository = new UserRepository();

  async execute(data: RegisterUserDTO): Promise<User> {
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
