import { BaseEntity } from "src/@application/base/entities/base.entity";
import { Consumer } from "src/@modules/consumers/entities/consumer.entity";
import { Invoice } from "src/@modules/invoices/entities/invoice.entity";
import { InvoiceProfile } from "src/@modules/invoices/entities/invoiceProfile.entity";
import { User } from "src/@modules/users/entities/user.entity";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { PRODUCT_SUBSCRIPTION_TYPE, PRODUCT_TYPE } from "../enums";
import { Product } from "./product.entity";

@Entity("product_subscriptions")
export class ProductSubsCription extends BaseEntity {
  @Column({ nullable: true })
  subscriptionDate?: string;

  @Column({ nullable: true, type: "float" })
  subscriptionFee?: number;

  @Column({ nullable: true })
  cover?: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: PRODUCT_SUBSCRIPTION_TYPE,
    default: PRODUCT_SUBSCRIPTION_TYPE.MONTHLY,
  })
  subscriptionType?: PRODUCT_SUBSCRIPTION_TYPE;

  @ManyToOne((type) => User, (user) => user.productSubscriptions)
  user?: User;

  @ManyToOne(
    (type) => InvoiceProfile,
    (invoiceProfile) => invoiceProfile.productSubscriptions
  )
  invoiceProfile?: InvoiceProfile;

  @ManyToOne((type) => Product, (product) => product.productSubscriptions)
  product?: Product;

  @ManyToOne((type) => Consumer, (consumer) => consumer.productSubscriptions)
  consumer?: Consumer;

  @OneToMany((type) => Invoice, (invoice) => invoice.productSubscription)
  invoices?: Invoice[];
}
