import { QueryCondition } from './QueryCondition';
import { SummaryParameter } from './SummaryParameter';
import { PageParameter } from './PageParameter';
import { QueryAttributes } from './QueryAttributes';

export class QueryParameter {
  queryConditions: QueryCondition[];
  summaryParameters: SummaryParameter;
  pageParameter: PageParameter = { pageIndex: 0, pageSize: 12 } as any;
  queryAttributes: QueryAttributes[];
}
