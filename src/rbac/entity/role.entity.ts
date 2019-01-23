import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  roleId: number;
  @Column({ nullable: false, length: 50 })
  roleName: string;
  @Column({ nullable: true })
  createTime: Date;
  @Column({ nullable: true })
  updateTime: Date;
  creatorId: number;
  @Column({ nullable: true, length: 50 })
  creator: string;
  @Column({ nullable: true, length: 200 })
  remark: string;
  @Column({ nullable: true, length: 2000 })
  menuIds: string;
  @Column({ nullable: false })
  orgId: number;

  // @ManyToMany(_ => Menu, menu => menu.roles)
  // @JoinTable()
  // menus: Menu[];
  @Column({ nullable: true })
  isSystem: boolean = false;
  @Column({ nullable: true })
  msgCodes: string;
}
