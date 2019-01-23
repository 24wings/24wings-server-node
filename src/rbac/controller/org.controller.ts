import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { Org } from '../entity/org.entity';
import { ExtremeService } from '../../common/service/extrem.service';
import { OrgDVO } from '../bean/dvo/org.dvo';

@ApiUseTags('rbac/org')
@Controller('rbac/org')
export class OrgController {
  constructor(private conn: Connection, private extreme: ExtremeService) {}
  @Get('/')
  async index(@Query('$top') $top: number, @Query('$filter') $filter: string) {
    if ($filter == 'parentOrgId eq 0') {
      $filter = 'parentOrgId is null';
      //   await conn
    } else {
      let org = await this.conn
        .getRepository(Org)
        .findOne({ where: this.extreme.getWhereSql($filter) });
      let orgs = await this.conn.getTreeRepository(Org).findAncestors(org);
      return { totalCount: orgs.length, data: orgs };
    }
  }
  @Post('/')
  async create(@Body() org: OrgDVO) {
    let parentOrg = await this.conn.getRepository(Org).findOne(org.parentId);
    org.parent = parentOrg;
    let newOrg = await this.conn.getTreeRepository(Org).save(org);
    return newOrg;
  }
  @Delete('/(:id)')
  async delete(@Param('id') id: number) {
    await this.conn.getRepository(Org).delete(id);
    return {};
  }
}
