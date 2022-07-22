import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCreateDTO } from "../dtos/user-create.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async getOne(id: string): Promise<User> {
    try {
      const res = await this.repository.findOne({ where: { id: id } });
      return res;
    } catch (error) {
      console.log("UserService ~ getOne ~ error", error);
      return error;
    }
  }

  async getAll(): Promise<[User[], number]> {
    try {
      const res = await this.repository.findAndCount();
      return res;
    } catch (error) {
      console.log("UserService ~ getAll ~ error", error);
      return error;
    }
  }

  async createOne(data: UserCreateDTO): Promise<User> {
    try {
      // data.dateOfBirth
      //   ? (data.dateOfBirth = Date.parse(data.dateOfBirth))
      //   : null;
      const res = await this.repository.insert(data);
      return await this.getOne(res.identifiers[0].id);
    } catch (error) {
      console.log("UserService ~ createOne ~ error", error);
      return error;
    }
  }
}
