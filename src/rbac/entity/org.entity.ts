import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
// @Tree('materialized-path')
export class Org {
  @PrimaryGeneratedColumn()
  orgId: number;
  @Column({ nullable: false, length: 20, unique: true })
  orgName: string;
  creatorId: number;
  @Column({ nullable: true, length: 30 })
  creator: string;
  @Column({ nullable: true })
  createTime: Date = new Date();
  @Column({ nullable: true })
  isSystem: boolean = false;
  @Column({ nullable: false })
  parentId: number;
  @Column({ nullable: true })
  remark: string;

  parentOrgId?: number;
}
