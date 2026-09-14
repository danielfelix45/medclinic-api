import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../utils/AppError";

export class GetAuthenticatedUserService {
  private userRepository = new UserRepository();

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}
