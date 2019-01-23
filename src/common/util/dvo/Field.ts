import { DVOSymbole } from './DVO';
import { FieldPower } from './FieldPower';

type DataType =
  | 'string'
  | 'boolean'
  | 'number'
  | 'unkown'
  | 'date'
  | 'ref-tree';

export const FieldSymbol = Symbol('field');
export interface IField {
  label: string;
  field: string;
  format?: string;
  queryOption?: any;
  dataType: DataType;
  editOption?: {
    editType: DataType;
    shortName?: string;
    format?: string;
    read?: string;
    write?: string;
  };
  power: number;
  /**服务端实体数据类型
   *
   *
   */
  designType?: any;
  shortName?: string;
}
export interface IFieldObject {
  [key: string]: IField;
}

export function Field(
  label: string,
  field: string,
  power: number = FieldPower.FC,
) {
  let opt: IField = { label, field, power, dataType: 'string' };
  return (target, propKey) => {
    let fields: IFieldObject = Reflect.getMetadata(FieldSymbol, target);
    let type = Reflect.getMetadata('design:type', target, propKey);
    switch (type) {
      case String:
        opt.dataType = 'string';
        opt.editOption = { editType: 'string' };
        break;
      case Boolean:
        opt.dataType = 'boolean';
        opt.editOption = { editType: 'boolean' };
        break;
      case Number:
        opt.dataType = 'number';
        opt.editOption = { editType: 'number' };
        break;
      case Date:
        opt.dataType = 'date';
        opt.editOption = { editType: 'date' };
        break;

      default:
        opt.dataType = 'date';
        opt.editOption = { editType: 'unkown' };
        break;
    }
    opt.designType = type;
    if (!fields) fields = {};
    fields[propKey] = opt;
    Reflect.defineMetadata(FieldSymbol, fields, target);
  };
}
export function getField(target: any): IFieldObject {
  console.log(__dirname + '/' + __filename + `:getField`, target);

  let fields = Reflect.getMetadata(FieldSymbol, target.prototype);
  return fields ? fields : {};
}
