import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class OrderNo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  currentKey: string;
  @Column()
  currentValue: number;
}
