import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../users/user.module";
import { AuthController } from "./controllers/auth.controller";
import { AuthOTP } from "./entities/auth-otp.entity";
import { AuthOTPService } from "./services/auth-otp.service";
import { AuthOTPSubscriber } from "./subscribers/authOtp.subscriber";

const services = [AuthOTPService];
const controllers = [AuthController];
const entities = [AuthOTP];
const subscribers = [AuthOTPSubscriber];

@Module({
  imports: [TypeOrmModule.forFeature([...entities]), UserModule],
  controllers: [...controllers],
  providers: [...services, ...subscribers],
  exports: [...services],
})
export class AuthModule {}
