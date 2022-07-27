import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthOTPService } from "../services/auth-otp.service";
import { ApiTags } from "@nestjs/swagger";
import { SendOtpToPhoneDTO } from "../dtos/send-otp-to-phone.dto";
import { SendOtpToEmailDTO } from "../dtos/send-otp-to-email.dto";
import { VerifyOtpDTO } from "../dtos/verify-otp.dto";
@ApiTags("Authentications")
@Controller("auth")
export class AuthController {
  constructor(private readonly authOTPService: AuthOTPService) {}

  @Post("otp/send-to-phone")
  async sendOtpToPhoneNumber(@Body() payload: SendOtpToPhoneDTO) {
    try {
      return this.authOTPService.sendOtpToPhoneNumber(payload);
    } catch (error) {
      throw error;
    }
  }
  @Post("otp/send-to-email")
  async sendOtpToEmail(@Body() payload: SendOtpToEmailDTO) {
    try {
      return this.authOTPService.sendOtpToEmail(payload);
    } catch (error) {
      throw error;
    }
  }
  @Post('otp/verify')
  async otpVerify(@Body() payload: VerifyOtpDTO) {
    return this.authOTPService.verifyOtpForPhoneNumber(payload);
  }
}
