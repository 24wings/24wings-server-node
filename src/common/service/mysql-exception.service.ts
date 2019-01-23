import { Injectable, HttpException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { ColumnInfo } from '../bean/ColumnInfo';

/**https://dev.mysql.com/doc/refman/8.0/en/information-schema-introduction.html */

@Injectable()
export class MySqlExceptionService {
  columnInfo: ColumnInfo[] = [];
  tables: { tableName: string; col: string; text: string }[] = [
    { tableName: 'org', col: 'orgName', text: '组织名字' },
    { tableName: 'org', col: 'parentOrgId', text: '上级组织' },
  ];
  constructor(private conn: Connection) {}
  async onModuleInit() {
    this.columnInfo = await this.conn.query(`      select
      * 
      from INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      where CONSTRAINT_SCHEMA ='test2' `);
  }
  parseError(err) {
    let actionText = '';
    if (/Cannot delete or update/.test(err + '')) {
      actionText = '不能删除或更新';
    }
    if (/Duplicate entry/.test(err)) {
      actionText = '不能重复';
    }

    let exit = this.columnInfo.find(col =>
      new RegExp(col.CONSTRAINT_NAME).test(err + ''),
    );
    if (exit) {
      let existColumn = this.tables.find(
        table =>
          table.tableName == exit.TABLE_NAME && table.col == exit.COLUMN_NAME,
      );
      if (existColumn) {
        debugger;
        throw new HttpException(existColumn.text + actionText, 400);
      } else {
        throw new HttpException('未知列错误', 400);
      }
      throw new HttpException('未知列错误', 400);
    } else {
      throw new HttpException('数据库错误', 400);
    }
  }
}
