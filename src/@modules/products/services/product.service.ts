import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductCreateDTO } from "../dtos/product-create.dto";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>
  ) {}

  async getOne(id: string): Promise<Product> {
    try {
      const res = await this.repository.findOne({ where: { id: id } });
      return res;
    } catch (error) {
      console.log("ProductService ~ getOne ~ error", error);
      return error;
    }
  }

  async getAll(): Promise<[Product[], number]> {
    try {
      const res = await this.repository.findAndCount();
      return res;
    } catch (error) {
      console.log("ProductService ~ getAll ~ error", error);
      return error;
    }
  }

  async createOne(_data: ProductCreateDTO): Promise<Product> {
    try {
      let data: any = { ..._data };
      const res = await this.repository.insert(data);
      return await this.getOne(res.identifiers[0].id);
    } catch (error) {
      console.log("ProductService ~ createOne ~ error", error);
      return error;
    }
  }
}
