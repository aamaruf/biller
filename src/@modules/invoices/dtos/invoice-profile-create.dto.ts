import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InvoiceProfileCreateDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  logo: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cover: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tagLine: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  signature: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  website: string;

  @ApiProperty()
  @IsString()
  user: string;
}
