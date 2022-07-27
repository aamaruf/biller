import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class SendOtpToPhoneDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  // @Matches(/^\+?01[3-9][0-9]{8}\b$/g)
  @ApiProperty({ example: "01636476123" })
  readonly phoneNumber: string;

  @ApiProperty({ example: ` String true false  or boolear true false` })
  @IsOptional()
  sendSms?: any;
}
