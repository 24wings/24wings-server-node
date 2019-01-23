import { Module } from '@nestjs/common';
import { DvoController } from './controller/dvo.controller';
import { StqController } from './controller/stq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StqService } from './service/stq.service';
import { UtilService } from './service/util.service';
import { TokenController } from './controller/token.controller';
import { ExtremeService } from './service/extrem.service';
import { AppConfig } from '../app.config';
import { MySqlExceptionService } from './service/mysql-exception.service';
import { ClassLoaderService } from './service/class-loader.service';
import { DVOService } from './service/dvo.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [
    StqService,
    UtilService,
    ExtremeService,
    AppConfig,
    MySqlExceptionService,
    ClassLoaderService,
    DVOService,
  ],
  controllers: [DvoController, StqController, TokenController],
  exports: [ExtremeService],
})
export class CommonModule {}
