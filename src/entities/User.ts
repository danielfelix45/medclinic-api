import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum UserRole {
  ADMINISTRADOR = "administrador",
  ATENDENTE = "atendente",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  name!: string;

  @Column("varchar", { unique: true })
  email!: string;

  @Column("varchar")
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.ATENDENTE,
  })
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;
}
