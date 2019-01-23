import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class ExtremeService {
  find(entity: any, options: { $filter: string } = { $filter: '' }) {
    return this.conn
      .getRepository<Object>(entity)
      .find({ where: options.$filter });
  }

  getWhereSql($filter) {
    return ($filter = $filter.replace(/eq/g, '='));
  }

  constructor(private conn: Connection) {}
}
