import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  static ip = 'http://localhost';
  static port = 8084;
  static get url() {
    return this.ip + ':' + this.port;
  }
  ROOT_DIR = __dirname;
}
