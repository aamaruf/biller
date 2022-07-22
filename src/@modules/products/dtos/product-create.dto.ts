import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PRODUCT_TYPE } from "../enums";

export class ProductCreateDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  demo: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsString()
  @IsOptional()
  cover: string;

  @IsString()
  @IsOptional()
  type: PRODUCT_TYPE;

  @IsString()
  user: string;
}
