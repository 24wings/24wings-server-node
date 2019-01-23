import path = require('path');
let rel = path.relative(
  `/Users/yangjie/workspace/new_framework/24wings-server-node/src/common/test`,
  __dirname,
);
console.log(rel);
