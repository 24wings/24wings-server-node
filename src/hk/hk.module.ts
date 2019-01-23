import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UtilService } from '../common/service/util.service';
import { DateService } from './service/date.service';
import { SmsService } from './service/sms.service';
import { UserController } from '../rbac/controller/user.controller';
import { JwtService } from './service/jwt.service';
import { HomeController } from './controller/home.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UserController, HomeController],
  providers: [UtilService, DateService, SmsService, JwtService],
})
export class HkModule {
  // constructor(private readonly connection: Connection) { }
}
