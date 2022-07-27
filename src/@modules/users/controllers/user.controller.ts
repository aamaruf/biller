import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { UserCreateDTO } from "../dtos/user-create.dto";
import { UserService } from "../services/user.service";
@ApiTags("User")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Get()
  // getAll(): Promise<any> {
  //   return this.userService.getAll();
  // }

  // @Get(":id")
  // getOne(@Param("id") id: string): Promise<any> {
  //   return this.userService.getByIdFromDB(id);
  // }

  @Get(":id")
  async findOne(
    @Param("id") id: string,
    // @RequestOptions() reqOptions: IOptions
  ): Promise<any> {
    const res = await this.userService.getByIdFromDB(id);
    return res
  }


  @Post()
  @ApiBody({ type: UserCreateDTO })
  async insert(
    @Body() reqPayloads: any
  ): Promise<any> {
    console.log("🚀🚀🚀🚀🚀 ============ reqPayloads", reqPayloads)
    return this.userService.insertIntoDB(reqPayloads);
  }


  // @Post()
  // createOne(@Body() data: UserCreateDTO): Promise<any> {
  //   return this.userService.createOne(data);
  // }
}

