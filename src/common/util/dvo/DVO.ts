import 'reflect-metadata';
import { IField, IFieldObject, getField } from './field';
import { HttpException } from '@nestjs/common';
export const DVOSymbole = Symbol('dvo');
export interface IDVO {
  view?: {
    viewType: 'table' | 'tree';
    parentIdExpr?: string;
    keyExpr?: string;
  };
  select: string;
  actionEntity: string;
  power: number;
  shortName?: string;
  fields?: IFieldObject;
  fieldType?: string;
  primaryKey: string;
  // editOption:{editType:'string'|'boolean'|'date'|'lookup'}
}
export function DVO(opt: IDVO) {
  return target => {
    opt.shortName = target.name;
    opt.view = { viewType: 'table' };
    Reflect.defineMetadata(DVOSymbole, opt, target);
    if (!global['dvo']) {
      global['dvo'] = [];
      global['dvo'].push(target);
    } else {
      global['dvo'].push(target);
    }
  };
}

export function getDVO(target): IDVO {
  let dvo = Reflect.getMetadata(DVOSymbole, target);
  if (dvo) {
    let fields = getField(target);
    dvo.fields = fields;
    return dvo;
  } else {
    throw new HttpException('不存在的数据视图对象', 400);
  }
}
/**
 *
 */

// @DVO({ select: 'sel' })
// class DVOTest {}
// console.log(getDVO(DVOTest));
