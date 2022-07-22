import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConsumerController } from "./controllers/consumer.controller";
import { Consumer } from "./entities/consumer.entity";
import { ConsumerService } from "./services/consumer.service";

const services = [ConsumerService];
const controllers = [ConsumerController];
const entities = [Consumer];
const subscribers = [];

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class ConsumerModule {}
