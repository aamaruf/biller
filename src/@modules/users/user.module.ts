import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controllers/user.controller";
import { User } from "./entities/user.entity";
import { UserService } from "./services/user.service";

const services = [UserService];
const controllers = [UserController];
const entities = [User];
const subscribers = [];

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class UserModule {}
