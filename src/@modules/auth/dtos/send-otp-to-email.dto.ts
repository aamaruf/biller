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

export class SendOtpToEmailDTO {
  @IsString()
  @IsNotEmpty()
  // @Matches(/^\+?01[3-9][0-9]{8}\b$/g)
  @ApiProperty({ example: "yourname@something.com" })
  readonly email: string;

  @ApiProperty({ example: ` String true false  or boolear true false` })
  @IsOptional()
  sendSms?: any;
}
