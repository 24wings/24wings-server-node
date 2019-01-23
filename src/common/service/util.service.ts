import { Connection } from 'typeorm';
import { OrderNo } from '../entity/order-no.entity';
export class UtilService {
  constructor(private conn: Connection) {}
  async getTransferOrderNo(mktId: number) {
    return this.getNo(mktId + `Transfer`);
  }
  async getNo(key: string) {
    let orderNo = await this.conn
      .getRepository(OrderNo)
      .findOne({ currentKey: key });
    if (!orderNo) {
      await this.conn
        .getRepository(OrderNo)
        .insert({ currentKey: key, currentValue: 0 });
      return 0;
    } else {
      await this.conn
        .getRepository(OrderNo)
        .update({ id: orderNo.id }, { currentValue: ++orderNo.currentValue });
      return ++orderNo.currentValue;
    }
  }
  getOrderNo(mktId: number) {
    return this.getNo(mktId + 'Order');
  }
}
