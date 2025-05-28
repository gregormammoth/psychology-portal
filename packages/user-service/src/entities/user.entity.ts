import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
} 