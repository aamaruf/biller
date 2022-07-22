import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./controllers/product.controller";
import { Product } from "./entities/product.entity";
import { ProductService } from "./services/product.service";


const services = [ProductService];
const controllers = [ProductController];
const entities = [Product];
const subscribers = [];

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class ProductModule {}
