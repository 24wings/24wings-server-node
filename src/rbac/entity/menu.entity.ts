import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Menu {
  @ApiModelProperty({ description: '菜单id' })
  @PrimaryGeneratedColumn()
  menuId: number;
  @Column({ nullable: false })
  text: string;
  @Column({ nullable: true })
  parentId: number;
  @Column({ nullable: true, length: 64 })
  link: string;
  @Column({ nullable: true, length: 64 })
  externalink: string;
  @Column({ nullable: true, length: 10 })
  target: string;
  @Column({ nullable: true, length: 40 })
  icon: string;

  @Column({ nullable: true })
  creatorId: number;
  @Column({ nullable: true, length: 2000 })
  config: string;
  @Column({ nullable: true })
  menuCode: number;
}
