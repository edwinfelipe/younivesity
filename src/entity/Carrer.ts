import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({ name: "carrers" })
  export class Carrer {
    @PrimaryGeneratedColumn()
    id?: number;
  
    @Column()
    name?: string;
  
    @CreateDateColumn({ name: "created_at" })
    createdAt?: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt?: Date;
  }
  