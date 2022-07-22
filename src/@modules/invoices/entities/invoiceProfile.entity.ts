import { BaseEntity } from "src/@modules/base/entities/base.entity";
import { Consumer } from "src/@modules/consumers/entities/consumer.entity";
import { User } from "src/@modules/users/entities/user.entity";
import { consumers } from "stream";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

@Entity("invoice_profiles")
export class InvoiceProfile extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  cover?: string;

  @Column({ nullable: true })
  tagLine?: string;

  @Column({ nullable: true })
  signature?: string;

  @Column({ nullable: true })
  website?: string;

  @ManyToOne((type) => User, (user) => user.invoiceProfiles)
  user?: User;
}
