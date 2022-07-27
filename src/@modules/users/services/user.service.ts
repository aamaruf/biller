import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isEmail, isNumber } from "class-validator";
import { BaseService } from "src/@application/base/service/base.service";
import { Repository } from "typeorm";
import { UserCreateDTO } from "../dtos/user-create.dto";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private service: Repository<User>
  ) {
    super(service, User.name);
  }
   async checkIfUserExist(identifier: string): Promise<User | any> {
    try {
      let isUserExist = undefined;

      const _selects = [
        "id",
        "phoneNumber",
        "email",
        "name",
        "password",
        "avatar",
        "name",
        "type",
      ];

      if (isNumber(identifier)) {
        isUserExist = await this.repository.find({
          where: { phoneNumber: identifier },
          select: [
            "id",
            "phoneNumber",
            "email",
            "name",
            "password",
            "avatar",
            "name",
            "type",
          ],
        });
      } else if (isEmail(identifier)) {
        isUserExist = await this.repository.find({
          where: { email: identifier },
          select: [
            "id",
            "phoneNumber",
            "email",
            "name",
            "password",
            "avatar",
            "name",
            "type",
          ],
        });
      } else {
        return false;
      }

      if (isUserExist) {
        return isUserExist;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

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
