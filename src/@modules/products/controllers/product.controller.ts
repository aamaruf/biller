import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductCreateDTO,  } from "../dtos/product-create.dto";
import { ProductService,  } from "../services/product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(): Promise<any> {
    return this.productService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string): Promise<any> {
    return this.productService.getOne(id);
  }

  @Post()
  createOne(@Body() data: ProductCreateDTO): Promise<any> {
    return this.productService.createOne(data);
  }
}
