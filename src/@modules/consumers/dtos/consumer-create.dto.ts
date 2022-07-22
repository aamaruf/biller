import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ConsumerCreateDTO {
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

  @IsOptional()
  address: any;

  @IsOptional()
  user: any;
}
