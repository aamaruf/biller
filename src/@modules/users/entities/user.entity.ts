import { BaseEntity } from "src/@modules/base/entities/base.entity";
import { Consumer } from "src/@modules/consumers/entities/consumer.entity";
import { InvoiceProfile } from "src/@modules/invoices/entities/invoiceProfile.entity";
import { Entity, Column, OneToMany } from "typeorm";
import { USER_STATUS, USER_TYPE } from "../enums";

@Entity("users")
export class User extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  cover?: string;

  @Column({ nullable: true })
  bloodGroup?: string;

  @Column({ nullable: true })
  dateOfBirth?: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: USER_TYPE,
    default: USER_TYPE.SERVICE_PROVIDER,
  })
  type?: USER_TYPE;

  @Column({
    nullable: true,
    type: "enum",
    enum: USER_STATUS,
    default: USER_STATUS.INACTIVE,
  })
  status?: USER_STATUS;

  @OneToMany((type) => Consumer, (consumer) => consumer.user)
  consumers?: Consumer[];

  @OneToMany((type) => InvoiceProfile, (invoiceProfile) => invoiceProfile.user)
  invoiceProfiles?: InvoiceProfile[];
}
