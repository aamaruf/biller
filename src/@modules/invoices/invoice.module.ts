import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InvoiceProfileController } from "./controllers/invoiceProflie.controller";
import { Invoice } from "./entities/invoice.entity";
import { InvoiceProfile } from "./entities/invoiceProfile.entity";
import { InvoiceProfileService } from "./services/invoiceProfile.service";

const services = [InvoiceProfileService];
const controllers = [InvoiceProfileController];
const entities = [Invoice,InvoiceProfile];
const subscribers = [];

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class InvoiceModule {}
