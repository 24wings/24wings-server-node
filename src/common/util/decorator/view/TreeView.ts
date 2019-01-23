import { getDVO } from '../../dvo/DVO';

export function TreeView(keyExpr: any, parentIdExpr: string) {
  return target => {
    let dvo = getDVO(target);
    if (!dvo) throw new Error('树形视图必须在 @DVO之上');
    dvo.view = { viewType: 'tree', keyExpr, parentIdExpr };
  };
}
