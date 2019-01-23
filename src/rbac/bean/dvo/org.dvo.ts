import { DVO } from 'src/common/util/dvo/DVO';
import { Field } from 'src/common/util/dvo/field';
import { ActionPower } from 'src/common/util/dvo/ActionPower';
import { FieldPower } from 'src/common/util/dvo/FieldPower';
import { Org } from 'src/rbac/entity/org.entity';
import { TreeView } from 'src/common/util/decorator/view/TreeView';
import { RefTree } from 'src/common/util/dvo/RefTree';
const { FS, FU, FC } = FieldPower;

@TreeView('orgId', 'parentId')
@DVO({
  select: ' from org ',
  actionEntity: 'rbac/entity/org.entity',
  primaryKey: 'orgId',
  power: ActionPower.Q | ActionPower.U | ActionPower.C | ActionPower.D,
})
export class OrgDVO implements Partial<Org> {
  @Field('组织id', 'orgId', 0)
  orgId: number;
  @Field('组织名称', 'orgName', FS | FC | FU)
  orgName: string;
  @RefTree('OrgDVO', 'readOrgName', 'writeOrgId')
  @Field('上级组织', 'parentId', FC | FU)
  parentId: number;
  @Field('备注', 'remark', FC | FU | FS)
  remark: string;
  @Field('系统内置', 'isSystem', FS)
  isSystem: boolean;
  parent;
  @Field('创建时间', 'createTime', FS)
  createTime: Date;
}
