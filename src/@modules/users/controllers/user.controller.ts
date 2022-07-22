import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserCreateDTO } from "../dtos/user-create.dto";
import { UserService } from "../services/user.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<any> {
    return this.userService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string): Promise<any> {
    return this.userService.getOne(id);
  }

  @Post()
  createOne(@Body() data: UserCreateDTO): Promise<any> {
    return this.userService.createOne(data);
  }
}
