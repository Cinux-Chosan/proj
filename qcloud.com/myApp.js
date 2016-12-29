const COS = require('./myLibs/cos/cos'),
  config = require('./myLibs/config');

let config_cos = config.cos;
let cos = new COS(config_cos.appid, config_cos.secretid, config_cos.secretkey, config_cos.bucket[0]);

console.log(cos.getSign());
