import { BaseEntity } from "src/@application/base/entities/base.entity";
import { Consumer } from "src/@modules/consumers/entities/consumer.entity";
import { InvoiceProfile } from "src/@modules/invoices/entities/invoiceProfile.entity";
import { User } from "src/@modules/users/entities/user.entity";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { PRODUCT_TYPE } from "../enums";
import { ProductSubsCription } from "./productSubscription.entity";

@Entity("products")
export class Product extends BaseEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  demo?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  cover?: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: PRODUCT_TYPE,
    default: PRODUCT_TYPE.SOFTWARE,
  })
  type?: PRODUCT_TYPE;

  @OneToMany(
    (type) => ProductSubsCription,
    (productSubscription) => productSubscription.product
  )
  productSubscriptions?: ProductSubsCription[];

  @ManyToOne((type) => User, (user) => user.products)
  user?: User;
}
