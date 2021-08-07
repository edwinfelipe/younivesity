import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "students" })
export default class Student {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstname?: string;

  @Column({ unique: true })
  code?: string;

  @Column({ unique: true })
  seq?: number;

  @Column({ nullable: true })
  middlename?: string;

  @Column()
  lastname?: string;

  @Column({ nullable: true })
  lastname2?: string;

  @Column({ name: "birth_date" })
  birthDate?: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt?: Date;
}
