export class PageParameter {
  pageIndex: number;
  pageSize: number;
  /*** 升序还是降序 asc/desc*/
  sortByAsc: boolean;
  /**
   * 排序的字段
   */
  sortField: string;
}
