import request = require('superagent');
import { AppConfig } from '../app.config';
import assert = require('power-assert');
describe('AppControldeler (e2e)', () => {
  it('/ (GET)', async () => {
    let res = await request.get(AppConfig.url).send({});
    console.log(res.text);
    assert(res.text == 'Hello World!', '1!=2');
  });
});
