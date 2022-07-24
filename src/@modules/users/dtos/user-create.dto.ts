import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserCreateDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cover: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bloodGroup: string;
}
