import { BaseEntity } from "src/@application/base/entities/base.entity";
import { ProductSubsCription } from "src/@modules/products/entities/productSubscription.entity";
import { User } from "src/@modules/users/entities/user.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { USER_STATUS, USER_TYPE } from "../enums";

@Entity("consumers")
export class Consumer extends BaseEntity {
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

  @Column({
    nullable: true,
    type: "jsonb",
    default: {},
  })
  address?: any;

  @Column({
    nullable: true,
    type: "enum",
    enum: USER_STATUS,
    default: USER_STATUS.INACTIVE,
  })
  status?: USER_STATUS;

  @ManyToOne((type) => User, (user) => user.consumers)
  user?: User;

  @OneToMany(
    (type) => ProductSubsCription,
    (productSubscription) => productSubscription.consumer
  )
  productSubscriptions?: ProductSubsCription[];
}
