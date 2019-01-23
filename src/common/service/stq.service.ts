import { Injectable, HttpException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { err } from '../util/res/err';
import { QueryParameter } from '../bean/http/QueryParameter';
import { QueryCondition } from '../bean/http/QueryCondition';
import { MySqlExceptionService } from './mysql-exception.service';

@Injectable()
export class StqService {
  constructor(
    private conn: Connection,
    private mysqlException: MySqlExceptionService,
  ) {}

  public async findPageEntityByEntity(
    queryParam: QueryParameter,
    entity: any,
  ): Promise<{ rows: any[]; count: number }> {
    console.log(queryParam, entity);
    if (!queryParam.pageParameter)
      queryParam.pageParameter = {
        pageIndex: 0,
        pageSize: 10,
        sortByAsc: true,
        sortField: '',
      };
    if (
      queryParam.pageParameter.pageSize == 0 ||
      !queryParam.pageParameter.pageSize
    )
      queryParam.pageParameter.pageSize = 1000;
    if (!queryParam.queryConditions) queryParam.queryConditions = [];
    let orderStr = '';
    // if (queryParam.orderList) {
    //     if (Array.isArray(queryParam.orderList)) {
    //         if (queryParam.orderList.length > 0) {
    //             orderStr = 'order by ';
    //             queryParam.orderList.forEach(rule => orderStr += rule.fieldName + ' ' + rule.sort);
    //         }
    //     }
    // }
    let result = await this.conn.manager.getRepository(entity).findAndCount({
      where: this.getWhereSql(queryParam.queryConditions) + ' ' + orderStr,
      take: queryParam.pageParameter.pageSize,
      skip:
        queryParam.pageParameter.pageIndex * queryParam.pageParameter.pageSize,
    });

    return { rows: result['0'], count: result['1'] };
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
    if (!whereSql) whereSql = '1=1';
    return whereSql;
  }
  getEntityName(entityPath: string): any {
    return entityPath.split('/').pop() as string;
  }

  async entityDel(entity, key: string) {
    let del;
    try {
      del = await this.conn.getRepository(entity).delete(key);
    } catch (e) {
      if (e) this.mysqlException.parseError(e);
    }
    return del;
  }

  async entityInsert(entity, values: any) {
    let newData;
    try {
      newData = await this.conn.getRepository(entity).save(values);
    } catch (e) {
      if (e) this.mysqlException.parseError(e);
    }
    return newData;
  }
  async entityUpdate(entity: any, updateObject: any) {
    if (!entity || !updateObject)
      throw new HttpException(`未找到更新实体`, 400);
    let id = this.conn.getRepository(entity).getId(updateObject);
    let data = await this.conn.getRepository(entity).findOne(id);
    if (data) {
      for (let key in updateObject) {
        data[key] = updateObject[key];
      }
      let updateData;
      try {
        updateData = await this.conn.getRepository(entity).save(data);
      } catch (e) {
        if (e) this.mysqlException.parseError(e);
      }
      return updateData;
    } else {
      throw new HttpException('数据不存在', 404);
    }
  }
}
