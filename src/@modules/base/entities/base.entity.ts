import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;

  @Column({ nullable: true })
  deletedAt: string;

  @Column({ nullable: true, type: "jsonb", default: {} })
  createdBy: any;

  @Column({ nullable: true, type: "jsonb", default: {} })
  updatedBy: any;

  @Column({ nullable: true, type: "jsonb", default: {} })
  deletedBy: any;

  @Column({ nullable: true, type: "jsonb", default: [] })
  updateHistory: any;
}
