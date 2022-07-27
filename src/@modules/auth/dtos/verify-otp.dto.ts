import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class VerifyOtpDTO {
  @IsString()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ example: "01636476123" })
  readonly phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: "01636476123" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @ApiProperty({ example: "123456" })
  readonly otp: string;
}
