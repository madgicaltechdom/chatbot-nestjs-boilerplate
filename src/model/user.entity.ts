import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobileNumber: string;

  @Column()
  language: string;
  @Column()
  botID: string;
}
