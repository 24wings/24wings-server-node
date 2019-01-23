import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';
import { Org } from './org.entity';
import { UserStatusEnum } from '../enums/user-status.enum';
import { ApiModelProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiModelProperty({ description: '用户名' })
  @Column({ nullable: true, length: 20 })
  name: string;
  @ApiModelProperty({ description: '登录名' })
  @Column({ nullable: false, unique: true, length: 30 })
  userName: string;
  @ApiModelProperty({ description: '密码' })
  @Column({ nullable: false, length: 1000 })
  password: string;
  pwdEncrypted: string;
  @ApiModelProperty({ description: '注册时间' })
  @Column()
  createTime: Date = new Date();
  @ApiModelProperty({
    description: '上次修改信息时间',
    xml: { heheda: '123' },
  })
  @Column({ nullable: true })
  updateTime: Date = new Date();
  @ApiModelProperty({ description: '注册时间' })
  @Column('enum', { enum: UserStatusEnum })
  status: UserStatusEnum = UserStatusEnum.Active;
  @Column()
  orgId: number;
  @Column({ nullable: true, length: 50 })
  creator: string;
  @Column({ nullable: true })
  creatorId: number;
  @Column({ nullable: true, length: 200 })
  roleIds: string;
  @Column({ nullable: true })
  isSystem: boolean = false;
  @OneToOne(type => Org, { cascade: true })
  @JoinColumn()
  org: Org;
  @Column({ nullable: true })
  lastUpdateTime: Date = new Date();

  @BeforeInsert()
  defaultDates() {
    this.createTime = new Date();
  }

  orgName: string;

  @BeforeUpdate()
  updateDates() {
    this.lastUpdateTime = new Date();
  }
  @AfterLoad()
  onAfterLoad() {
    if (this.org) this.orgName = this.org.orgName;
  }
}
