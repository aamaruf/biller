import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ConsumerCreateDTO } from "../dtos/consumer-create.dto";
import { ConsumerService } from "../services/consumer.service";
import {ApiTags } from '@nestjs/swagger';
@ApiTags('Consumer')
@Controller("consumers")
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  getAll(): Promise<any> {
    return this.consumerService.getAll();
  }

  @Get(":id")
  getOne(@Param('id') id: string): Promise<any> {
    return this.consumerService.getOne(id);
  }

  @Post()
  createOne(@Body() data: ConsumerCreateDTO): Promise<any> {
    return this.consumerService.createOne(data);
  }
}
