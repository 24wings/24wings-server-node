import { Controller, Post, Query, Get, Body, Param } from '@nestjs/common';
import { Connection } from 'typeorm';
import { StqService } from '../service/stq.service';
import { success } from '../util/res/success';
import { err } from '../util/res/err';
import { ApiUseTags } from '@nestjs/swagger';
import { AppConfig } from '../../app.config';
import path = require('path');
import { QueryParameter } from '../bean/http/QueryParameter';
import { ClassLoaderService } from '../service/class-loader.service';
@ApiUseTags('common', 'stq')
@Controller('common/stq')
export class StqController {
  constructor(
    private stqService: StqService,
    private classLoaderService: ClassLoaderService,
  ) {}
  @Post('query')
  async query(
    @Query('className') className: string,
    @Body() queryParameter: QueryParameter,
  ) {
    let entity = this.classLoaderService.getEntityFromClassName(className);
    let data = await this.stqService.findPageEntityByEntity(
      queryParameter,
      entity,
    );
    return success(data);
  }
  /**实体更新 */
  @Post('update')
  async dataUpdate(@Query('className') className: string, @Body() body: any) {
    let entity = this.classLoaderService.getEntityFromClassName(className);
    let result = await this.stqService.entityUpdate(entity, body);
    return success(result);
  }
  @Post('insert')
  async dataInsert(@Query('className') className: string, @Body() dataItem) {
    let entity = this.classLoaderService.getEntityFromClassName(className);
    if (entity) {
      let newData = await this.stqService.entityInsert(entity, dataItem);
      return success({ newData });
    }
  }
  @Get('remove')
  async entityDelete(
    @Query('className') className: string,
    @Query('key') key: string,
  ) {
    let entity = this.classLoaderService.getEntityFromClassName(className);
    if (entity) {
      let del = await this.stqService.entityDel(entity, key);
      return success({ del });
    }
  }

  /**
   * post
   * ?className
   * body:QueryParameter
   */
  // @Get('entity-query/:entityName')
  // async entityQuery(
  //   @Query('className') className: string,
  //   @Param('entityName') entityName: string,
  //   @Query('$top') $top: number = 10,
  //   @Query('$skip') $skip = 0,
  //   @Query('$orderby') $orderby: string = '',
  //   @Query('$filter') $filter = '',
  // ) {
  //   if ($filter.trim()) {
  //     $filter = ` ${$filter}`.replace(/@/g, '%');
  //   }
  //   let orderBy = {};
  //   if ($orderby) {
  //     let orderByStr = $orderby.trim().split(' ');
  //     orderBy[orderByStr[0]] = orderByStr[1];
  //   }
  //   console.log(orderBy, $filter);
  //   let entityClass = this.entityMaps[entityName];
  //   let data = await this.conn
  //     .getRepository(entityClass as new () => UserEntity)
  //     .find({ take: $top, skip: $skip, order: orderBy, where: $filter });
  //   let count = await this.conn
  //     .getRepository(entityClass as new () => UserEntity)
  //     .count();
  //   if (entityClass) {
  //     return success({ data, totalCount: count });
  //   } else {
  //     return err(400, '查询错误,未知的实体');
  //   }

  // }
}
