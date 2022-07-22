import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InvoiceProfileCreateDTO {
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
  logo: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  @IsOptional()
  tagLine: string;

  @IsString()
  @IsOptional()
  signature: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  user: string;
}
