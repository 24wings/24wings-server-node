import { Controller, Post, Query, Get, Body, Param, Put } from '@nestjs/common';
import { success } from '../util/res/success';
import { ApiUseTags } from '@nestjs/swagger';
import { QueryParameter } from '../bean/http/QueryParameter';
import { getDVO, IDVO } from '../util/dvo/DVO';
import { DVOService } from '../service/dvo.service';
import { getField } from '../util/dvo/field';
@ApiUseTags('common', 'dvo')
@Controller('common/dvo')
export class DvoController {
  version = new Date();
  constructor(private dvoService: DVOService) {}
  @Post('query')
  async query(@Query('className') className: string) {
    return this.dvoService.query(className, {} as any);
  }
  @Get('getVersion')
  async getVersion() {
    return { version: this.version };
  }
  @Get('construct/list')
  async dvoList() {
    if (global['dvo']) {
      let entitys = global['dvo'].map((entity: Object) => {
        let idvo = getDVO(entity);
        let fields = getField(entity);
        idvo.fields = fields;
        return idvo;
      });
      return success({ list: entitys });
    } else {
      return success({ list: [] });
    }
  }
  @Post('search')
  async search(
    @Query('resource') resource: string,
    @Body() queryParam: QueryParameter,
  ) {
    let data = await this.dvoService.query(resource, queryParam);
    return success({ paging: data });
  }

  @Get('')
  async getOne(@Query('resource') resource: string, @Query('key') key: string) {
    let data = await this.dvoService.getOne(resource, key);
    return success({ data });
  }

  /**实体更新 */
  @Post('')
  async insert(@Body() body: { dataItem: any; resource: string }) {
    let result = await this.dvoService.insert(body.resource, body.dataItem);
    return success({ result });
  }

  @Post('delete')
  async remove(@Body() body: { resource: string; key: any }) {
    let del = await this.dvoService.delete(body.resource, body.key);
    return success({ del });
  }

  @Put('')
  async update(@Body() body: { resource: string; key: string; dataItem: any }) {
    let del = await this.dvoService.update(
      body.resource,
      body.key,
      body.dataItem,
    );
    return success({ del });
  }
  // @Post('entity/insert')
  // async dataInsert(@Query('className') className: string, @Body() dataItem) {
  //   let insert;
  //   try {
  //     insert = await this.dv.entityInsert(className, dataItem);
  //   } catch (e) {
  //     if (e) return e;
  //   }
  //   return success({ insert });
  // }
  //   @Post('entity/delete')
  //   async entityDelete(@Query() className: string, @Body() dataItem: any) {
  //     let del = await this.stqService.entityDel(className, dataItem);
  //     return success({ del });
  //   }

  //   @Get('test')
  //   async test2() {
  //     let orgs = await this.conn.getRepository(OrgEntity).find();
  //     return success({ data: orgs, totalCount: orgs.length });
  //   }
  // @Get("/app/stq/entity/meta")
  // async entityMeta(@Query('className') className: string) {
  //     let meta = await this.stqService.getEntityMeta(className);
  //     return success({ metaObject: meta.metaObject });
  // }
  // entityDetail() {
  //     let { entity } = this.ctx.query;
  //     let queryParam: QueryParam = this.ctx.request.body;
  //     // let data = this.service.framework.stq.getEntityMeta(entity);
  //     let user = { username: '123', password: '123' };
  //     let token = this.service.framework.jwt.sign(user);
  //     this.ctx.body = { ok: true, data: { entity, queryParam, data: token } };
  // }

  //   @Get('test-query')
  //   async test(@Query('dvoName') dvoName: string = '') {
  //     let dvo = this.entityMaps[dvoName];
  //     if (dvo) {
  //       let dvoMeta: IDVO = Reflect.getMetadata(DVOSymbol, dvo);
  //       console.log(dvoMeta);

  //       let sql = await this.conn
  //         .getRepository(dvoMeta.entity as new () => UserEntity)
  //         .find({ relations: dvoMeta.relations });
  //       sql = sql.map(obj => Object.assign(obj, new UserManageDVO()));
  //       return success(sql);
  //     } else {
  //       return err(400, '找不到dvo');
  //     }
  //   }

  /**
   * post
   * ?className
   * body:QueryParameter
   */
  @Get('query/:entityName')
  async entityQuery(
    // @Body() queryParam: QueryParam,
    @Param('entityName') entityName: string,
    @Query('$top') $top: number = 10,
    @Query('$skip') $skip = 0,
    @Query('$orderby') $orderby: string = '',
    @Query('$filter') $filter = '',
  ) {
    if ($filter.trim()) {
      $filter = ` ${$filter}`.replace(/@/g, '%');
    }
    let orderBy = {};
    if ($orderby) {
      let orderByStr = $orderby.trim().split(' ');
      orderBy[orderByStr[0]] = orderByStr[1];
    }

    // let dvo = this.entityMaps[entityName];

    // if (dvo) {
    //     let data = await this.conn.getRepository(dvoMeta.entity as new () => UserEntity)

    //         .find({ take: $top, skip: $skip, order: orderBy, where: $filter });

    //     let totalCount = await this.conn.getRepository(dvoMeta.entity as new () => UserEntity).count();
    //     return success({data,totalCount})
    // } else {
    //     return err(400, '数据视图对象不存在');
    // }
    // if (entityClass) {
    //     return success({ data, totalCount: count });
    // } else {
    //     return err(400, '查询错误,未知的实体')
    // }
  }
}
