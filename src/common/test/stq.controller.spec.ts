import request = require('superagent');
import { AppConfig } from '../../app.config';
import assert = require('power-assert');
describe('CommonModule StqController (e2e)', () => {
  it('Post /common/stq/query', async () => {
    let res = await request
      .post(
        AppConfig.url + '/common/stq/query?className=/rbac/entity/org.entity',
      )
      .send({});
    console.log(res.text);
    assert(res.text == 'Hello World!', '1!=2');
  });
});
