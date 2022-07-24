import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PRODUCT_TYPE } from "../enums";

export class ProductCreateDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  demo: string;

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
  type: PRODUCT_TYPE;

  @ApiProperty()
  @IsString()
  user: string;
}
