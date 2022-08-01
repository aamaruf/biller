import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  gen6digitOTP,
  isEmail,
  isNumber,
  toBool
} from "src/@application/utils/util.function";
import { MailHelper } from "src/@modules/mail/helpers/mail.helper";
import { User } from "src/@modules/users/entities/user.entity";
import { UserService } from "src/@modules/users/services/user.service";
import { Repository } from "typeorm";
import { SendOtpToEmailDTO } from "../dtos/send-otp-to-email.dto";
import { SendOtpToPhoneDTO } from "../dtos/send-otp-to-phone.dto";
import { VerifyOtpDTO } from "../dtos/verify-otp.dto";
import { AuthOTP } from "../entities/auth-otp.entity";

@Injectable()
export class AuthOTPService {
  mailHelper = new MailHelper();
  constructor(
    @InjectRepository(AuthOTP)
    private repository: Repository<AuthOTP>,
    private userService: UserService
  ) { }

  async sendOtpToPhoneNumber(payload: SendOtpToPhoneDTO, sms?: boolean) {
    try {
      if (!isNumber(payload.phoneNumber)) {
        throw new Error("Invalid Phone Number!");
      }
      const otp = gen6digitOTP().toString();
      await this.createOrUpdate(payload.phoneNumber, otp);

      const response: any = {
        otp,
        message: `OTP Sent to ${payload.phoneNumber}`,
      };
      try {
        if (payload && payload.sendSms) {
          payload.sendSms = toBool(payload.sendSms);
        }
        let sms = true;

        if (!payload.sendSms) {
          sms = false;
        }

        if (!sms) {
          return response;
        } else {
          // await this.messageAnalyticaService.sendOTP({
          //   smsbody: `Your OTP Code is ${otp.toString()}.Thanks for using Biller.`,
          //   recipient: payload.phoneNumber,
          // });
          return response;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async sendOtpToEmail(payload: SendOtpToEmailDTO, sms?: boolean) {
    try {
      if (!isEmail(payload.email)) {
        throw new Error("Invalid Email!");
      }
      const otp = gen6digitOTP().toString();
      await this.createOrUpdate(payload.email, otp);

      const response: any = {
        otp,
        message: `OTP Sent to ${payload.email}`,
      };
      try {
        if (payload && payload.sendSms) {
          payload.sendSms = toBool(payload.sendSms);
        }
        let sms = true;

        if (!payload.sendSms) {
          sms = false;
        }

        if (!sms) {
          return response;
        } else {
          const res = await this.mailHelper.Mail({ email: payload.email, subject: 'Biller OTP Verification', body: `Your OTP Code is <b>${otp.toString()}</b>. Thanks for using Biller.` });
          if (res === 200) {
            return {
              success: true,
              message: `OTP Sent to ${payload.email}`
            }
          }
          else
            return res
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createOrUpdate(identifier: string, otp: string): Promise<AuthOTP> {
    try {
      let isExist: AuthOTP = undefined;

      if (isNumber(identifier)) {
        isExist = await this.repository.findOne({
          where: { phoneNumber: identifier } as any,
          select: ["id", "phoneNumber", "otp", "expiryDate"],
        });
      } else if (isEmail(identifier)) {
        isExist = await this.repository.findOne({
          where: { email: identifier } as any,
          select: ["id", "email", "otp", "expiryDate"],
        });
      } else {
        throw new BadRequestException("Invalid Identifier");
      }
      if (isExist) {
        if (!isExist.isExpired) {
          throw Error(`Otp already sent to your ${identifier}`);
        }
        this.repository.save({ id: isExist.id }, { otp: otp } as any);
      } else {
        if (isNumber(identifier)) {
          let aa = await this.repository.insert({
            phoneNumber: identifier,
            otp,
          });
          return aa.identifiers[0];
        } else if (isEmail(identifier))
          return this.repository.create({ email: identifier, otp });
      }
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  async verifyOtpForPhoneNumber(payload: VerifyOtpDTO) {
    let isExist: any;
    if (payload?.email && isEmail(payload.email)) {
      isExist = await this.repository.findOne({
        where: { phoneNumber: payload.phoneNumber, otp: payload.otp } as any,
      })
    };
    if (payload?.phoneNumber && isNumber(payload.phoneNumber)) {
      isExist = await this.repository.findOne({
        where: { phoneNumber: payload.phoneNumber, otp: payload.otp } as any,
      })
    };

    if (!isExist) {
      throw new NotFoundException("Invalid OTP");
    }

    if (isExist.isExpired) {
      throw new NotFoundException("OTP Expired");
    }

    const user: User = await this.userService.checkIfUserExist(
      payload.phoneNumber
    );

    if (!user) {
      throw new NotFoundException("User not found");
    }

    delete user.password;

    const tokenPayload = { ...user };
    await this.repository.delete({
      phoneNumber: payload.phoneNumber,
      otp: payload.otp,
    });

    // const token = await (
    //   await this.jwtHelper.makeAccessToken(tokenPayload)
    // ).token;
    const token = null;
    return { token, user };
  }
}
