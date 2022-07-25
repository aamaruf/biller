import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("auth_otps")
export class AuthOTP {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  otp?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true, type: "timestamp" })
  expiryDate?: Date;

  isExpired?: boolean;
}
