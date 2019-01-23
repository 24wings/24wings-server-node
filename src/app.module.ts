import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HkModule } from './hk/hk.module';
import { CommonModule } from './common/common.module';
import { RbacModule } from './rbac/rbac.module';
import { AppConfig } from './app.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lwm740130',
      database: 'test2',
      logging: true,
      entities: [
        __dirname + '/rbac/entity/*{.ts,.js}',
        __dirname + '/hk/entity/*{.ts,.js}',
      ],
      synchronize: true,
      logger: 'advanced-console',
    }),
    CommonModule,
    RbacModule,
    HkModule,
  ],
  providers: [AppConfig],
  exports: [AppConfig],
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
console.log(`dvo:`, global['dvo']);
