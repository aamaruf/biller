import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InvoiceProfileCreateDTO } from "../dtos/invoice-profile-create.dto";
import { InvoiceProfile } from "../entities/invoiceProfile.entity";

@Injectable()
export class InvoiceProfileService {
  constructor(
    @InjectRepository(InvoiceProfile)
    private repository: Repository<InvoiceProfile>
  ) {}

  async getOne(id: string, options?: any): Promise<InvoiceProfile> {
    try {
      const res = await this.repository.findOne({ where: { id: id } });
      return res;
    } catch (error) {
      console.log("InvoiceProfileService ~ getOne ~ error", error);
      return error;
    }
  }

  async getAll(): Promise<[InvoiceProfile[], number]> {
    try {
      const res = await this.repository.findAndCount();
      return res;
    } catch (error) {
      console.log("InvoiceProfileService ~ getAll ~ error", error);
      return error;
    }
  }

  async createOne(_data: InvoiceProfileCreateDTO): Promise<InvoiceProfile> {
    try {
      let data: any = { ..._data };
      // data.userId ? (data.user = data.userId) : null;
      const res = await this.repository.insert(data);
      return await this.getOne(res.identifiers[0].id);
    } catch (error) {
      console.log("InvoiceProfileService ~ createOne ~ error", error);
      return error;
    }
  }
}
