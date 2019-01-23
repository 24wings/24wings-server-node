import { Module } from '@nestjs/common';
import { OrgController } from './controller/org.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [],
  controllers: [OrgController],
})
export class RbacModule {}
