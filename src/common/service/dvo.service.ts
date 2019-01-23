import { Injectable, HttpException } from '@nestjs/common';
import { QueryParameter } from '../bean/http/QueryParameter';
import { Connection } from 'typeorm';
import { getDVO, IDVO } from '../util/dvo/DVO';
import { ClassLoaderService } from './class-loader.service';
import { QueryCondition } from '../bean/http/QueryCondition';

@Injectable()
export class DVOService {
  constructor(
    private conn: Connection,
    private classLoaderService: ClassLoaderService,
  ) {}

  getOne(resource: string, pk: string) {
    let dvoEntity = this.getDVOEntityByResourceName(resource);
    let dvo = getDVO(dvoEntity);
    let entity = this.classLoaderService.getEntityFromClassName(
      dvo.actionEntity,
    );
    return this.conn.getRepository(entity).findOne(pk);
  }
  async query(resource: string, queryParam: QueryParameter) {
    let dvoEntity = this.getDVOEntityByResourceName(resource);
    let dvo = getDVO(dvoEntity);
    let querySql = this.getQuerySql(dvo, queryParam);
    let data = await this.conn.query(querySql);
    this.parseRows(data, dvo);
    let totalCount = await this.conn.query(this.getCountSql(dvo));
    return { rows: data, count: totalCount[0].totalCount };
  }
  async delete(resource: string, key: any) {
    let dvoEntity = this.getDVOEntityByResourceName(resource);
    let dvo = getDVO(dvoEntity);
    let entity = this.classLoaderService.getEntityFromClassName(
      dvo.actionEntity,
    );
    return this.conn.getRepository(entity).delete(key);
  }

  async update(resource: string, key, dataItem: any) {
    let dvoEntity = this.getDVOEntityByResourceName(resource);
    let dvo = getDVO(dvoEntity);
    let entity = this.classLoaderService.getEntityFromClassName(
      dvo.actionEntity,
    );

    return this.conn.getRepository(entity).update(key, dataItem);
  }

  async insert(resource: string, dataItem: any) {
    let dvoEntity = this.getDVOEntityByResourceName(resource);
    let dvo = getDVO(dvoEntity);

    let entity = this.classLoaderService.getEntityFromClassName(
      dvo.actionEntity,
    );
    return this.conn.getRepository(entity).save(dataItem);
  }

  getDVOEntityByResourceName(resource: string): IDVO {
    let dvoEntity = global['dvo'].find((dvo: any) => dvo.name == resource);
    if (!dvoEntity) {
      throw new HttpException('找不到DVO', 400);
    } else {
      return dvoEntity;
    }
  }

  private async parseRows(rows: any[], dvo: IDVO) {
    rows.forEach(row => {
      let keys = Object.keys(dvo.fields);
      keys.forEach(key => {
        switch (dvo.fields[key].designType) {
          case Boolean:
            row[key] = row[key] ? undefined : new Boolean(row);
            break;
          case Date:
            row[key] = row[key] ? undefined : new Date(row[key]);
            break;
        }
      });
    });
  }

  private getQuerySql(dvo: IDVO, queryParam: QueryParameter) {
    return `select ${this.getConditionSql(dvo, queryParam)} 
    ${dvo.select} ${this.getWhereSql(
      queryParam.queryConditions,
    )} ${this.getLimitSql(queryParam)}`;
  }

  getWhereSql(conditions: QueryCondition[]) {
    let whereSql = ``;
    conditions.forEach((condition, i) => {
      if (condition.compare == ':') condition.compare = 'like';
      if (condition.compare == 'like') condition.value = `%${condition.value}%`;
      whereSql += `${condition.field} ${condition.compare} ${
        typeof condition.value == 'string' && condition.compare != 'in'
          ? `'${condition.value}'`
          : condition.value
      } ${i == conditions.length - 1 ? '' : condition.andOr + ' '}`;
    });
    if (!whereSql) whereSql = ' 1=1';

    return `where ` + whereSql;
  }

  private getCountSql(dvo: IDVO) {
    return `select count(*) as totalCount ${dvo.select} `;
  }
  private getConditionSql(dvo: IDVO, queryParam: QueryParameter) {
    let select = ``;
    Object.keys(dvo.fields).forEach(key => {
      select += `${dvo.fields[key].field} as ${key},`;
    });
    select = select.substring(0, select.length - 1);
    return select;
  }
  private getLimitSql(queryParam: QueryParameter) {
    if (queryParam.pageParameter) {
      return ` limit ${(queryParam.pageParameter.pageIndex - 1) *
        queryParam.pageParameter.pageSize},${
        queryParam.pageParameter.pageSize
      }`;
    } else {
      return ``;
    }
  }
}
