import { getField, IField, IFieldObject, FieldSymbol } from './field';

export function RefTree(shortName: string, read: string, write: string) {
  return function(target, prop) {
    // let field: IFieldObject = getField(target);
    let field: IFieldObject = Reflect.getMetadata(FieldSymbol, target);
    console.log(field);
    field[prop].dataType = 'ref-tree';
    field[prop].editOption = {
      editType: 'ref-tree',
      shortName: shortName,
      read,
      write,
    };
    field[prop].shortName = shortName;
  };
}
