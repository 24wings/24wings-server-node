import path = require('path');
import { AppConfig } from 'src/app.config';
import { HttpException, Injectable } from '@nestjs/common';
@Injectable()
export class ClassLoaderService {
  constructor(private appConfig: AppConfig) {}
  getEntityFromClassName(className: string) {
    if (typeof className == 'string') {
      let entityModule;
      try {
        let file =
          path.relative(__dirname, this.appConfig.ROOT_DIR) + '/' + className;
        console.log(`file:`, file);
        entityModule = require(file);
      } catch (e) {
        console.log(className);
        if (e) throw new HttpException('模块错误', 400);
      }
      for (let key in entityModule) {
        console.log(key);
      }
      if (!entityModule) {
        throw new HttpException('不存在的实体', 400);
      }
      return entityModule[Object.keys(entityModule)[0]];
    } else {
      throw new HttpException('未知的模块名称' + typeof className, 400);
    }
  }
}
