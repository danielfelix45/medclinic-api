import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  private repository = AppDataSource.getRepository(User);

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
