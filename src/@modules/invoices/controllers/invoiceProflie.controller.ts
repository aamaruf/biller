import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { InvoiceProfileCreateDTO } from "../dtos/invoice-profile-create.dto";
import { InvoiceProfileService } from "../services/invoiceProfile.service";

@Controller("invoice-profiles")
export class InvoiceProfileController {
  constructor(private readonly invoiceProfileService: InvoiceProfileService) {}

  @Get()
  getAll(): Promise<any> {
    return this.invoiceProfileService.getAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string): Promise<any> {
    return this.invoiceProfileService.getOne(id);
  }

  @Post()
  createOne(@Body() data: InvoiceProfileCreateDTO): Promise<any> {
    return this.invoiceProfileService.createOne(data);
  }
}
