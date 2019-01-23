import { Controller, Post, Body } from '@nestjs/common';
import { Connection } from 'typeorm';
import _ = require('lodash');
import { LoginBean } from '../../common/bean/LoginBean';
import { AuditStatusEnum } from '../../hk/enum/AuditStatus.enum';

import { JwtService } from '../../hk/service/jwt.service';
import { User } from '../entity/user.entity';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('rbac/user')
@Controller('rbac/user')
export class UserController {
  constructor(private conn: Connection, private jwtService: JwtService) {}
  @Post('login')
  async login(@Body() user: User) {}
  //   @Post('login')
  //   async login(@Body() loginBean: LoginBean) {
  //     let user = await this.conn
  //       .getRepository(UserEntity)
  //       .findOne({ userName: loginBean.userName });
  //     let member = await this.conn
  //       .getRepository(MemberEntity)
  //       .findOne({ where: { mobile: loginBean.userName } });
  //     if (user) {
  //       let roles: RoleEntity[] = [];
  //       if (user.roleIds) {
  //         roles = await this.conn
  //           .getRepository(RoleEntity)
  //           .findByIds(user.roleIds.split(','));
  //       } else {
  //         roles = [];
  //       }
  //       let menus: MenuEntity[] = [];
  //       let menuIds: number[] = [];
  //       if (member) {
  //         if (
  //           member &&
  //           (member as MemberEntity).memberStatus == AuditStatusEnum.APPROVED
  //         ) {
  //           roles.forEach(role =>
  //             menuIds.push(
  //               ...role.menuIds
  //                 .split(',')
  //                 .filter(id => id)
  //                 .map(id => parseInt(id)),
  //             ),
  //           );
  //           menuIds = _.uniq(menuIds);
  //           menus = await this.conn.getRepository(MenuEntity).findByIds(menuIds);
  //         } else {
  //           return err(400, '用户尚未通过认证');
  //         }
  //         //    await this.service.framework.jwt.sign({user,member});

  //         return user.password == loginBean.password
  //           ? success(
  //               {
  //                 employee: user,
  //                 menus,
  //                 member,
  //                 token: this.jwtService.sign({
  //                   id: user.id,
  //                   menuIds,
  //                   user,
  //                   member,
  //                 }),
  //               },
  //               '登陆成功',
  //             )
  //           : err(400, '密码错误');
  //       } else {
  //         if (user) {
  //           roles.forEach(role =>
  //             menuIds.push(
  //               ...role.menuIds
  //                 .split(',')
  //                 .filter(id => id)
  //                 .map(id => parseInt(id)),
  //             ),
  //           );
  //           menuIds = _.uniq(menuIds);
  //           menus = await this.conn.getRepository(MenuEntity).findByIds(menuIds);
  //           return user.password == loginBean.password
  //             ? success(
  //                 {
  //                   employee: user,
  //                   menus,
  //                   member,
  //                   token: this.jwtService.sign({
  //                     id: user.id,
  //                     menuIds,
  //                     user,
  //                     member,
  //                   }),
  //                 },
  //                 '登陆成功',
  //               )
  //             : err(400, '密码错误');
  //         } else return err(400, '用户不存在');
  //       }
  //     } else {
  //       return err(400, '用户尚未注册');
  //     }
  //   }

  //   @Post('/user/modify')
  //   async userModify(@Body() user: UserEntity) {
  //     let dbUser = await this.conn.getRepository(UserEntity).findOne(user.id);
  //     if (dbUser) {
  //       if (user.name) {
  //         dbUser.name = user.name;
  //       }
  //       if (user.password) {
  //         dbUser.password = user.password;
  //       }
  //       await this.conn.getRepository(UserEntity).save(dbUser);
  //       return success({});
  //     } else {
  //       return err(400, '用户不存在');
  //     }
  //   }
}
