import { BaseEntity } from "src/@application/base/entities/base.entity";
import { ProductSubsCription } from "src/@modules/products/entities/productSubscription.entity";
import { User } from "src/@modules/users/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity("invoices")
export class Invoice extends BaseEntity {
  @Column({ nullable: true, default: false })
  isSMSNotificationSend?: boolean;

  @Column({ nullable: true, default: false })
  isEmailNotificationSend?: boolean;

  @Column({ nullable: true, default: false })
  isSubscriptionFeePaid?: boolean;

  @Column({ nullable: true })
  invoiceFor?: string;

  @Column({ nullable: true, type: "float" })
  subscriptionFeePayable?: number;

  @Column({ nullable: true, type: "float" })
  subscriptionFeePaid?: number;

  @ManyToOne((type) => User, (user) => user.invoiceProfiles)
  user?: User;

  @ManyToOne(
    (type) => ProductSubsCription,
    (productSubscription) => productSubscription.invoices
  )
  productSubscription?: ProductSubsCription;
}
