import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  @IsOptional()
  bloodGroup: string;
}
