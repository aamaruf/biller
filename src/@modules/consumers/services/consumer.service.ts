import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConsumerCreateDTO } from "../dtos/consumer-create.dto";
import { Consumer } from "../entities/consumer.entity";

@Injectable()
export class ConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private repository: Repository<Consumer>
  ) {}

  async getOne(id: string): Promise<Consumer> {
    try {
      const res = await this.repository.findOne({
        where: { id: id },
        relations: ["user"],
      });
      return res;
    } catch (error) {
      console.log("ConsumerService ~ getOne ~ error", error);
      return error;
    }
  }

  async getAll(): Promise<[Consumer[], number]> {
    try {
      const res = await this.repository.findAndCount();
      return res;
    } catch (error) {
      console.log("ConsumerService ~ getAll ~ error", error);
      return error;
    }
  }

  async createOne(data: ConsumerCreateDTO): Promise<Consumer> {
    try {
      const res = await this.repository.insert(data);
      return await this.getOne(res.identifiers[0].id);
    } catch (error) {
      console.log("ConsumerService ~ createOne ~ error", error);
      return error;
    }
  }
}
