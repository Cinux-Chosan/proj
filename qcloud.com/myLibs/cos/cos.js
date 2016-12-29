const randomstring = require('randomstring'),
  crypto = require('crypto');

function COS (appid, secretid, secretkey,bucket) {
  this.appid = appid;
  this.secretid = secretid;
  this.secretkey = secretkey;
  this.bucket = bucket;

}


COS.prototype.getOriginal = function (expTime, filed) {
  this.expTime = expTime = expTime || this.expTime;
  this.filed = filed = filed || this.filed || '';

  let currentTime = Math.round(new Date().getTime()/1000),
    randomstr = randomstring.generate({charset: 'numeric', length: 10});
    filed = filed.startsWith('/') ? filed.substring(1, filed.length) : filed;
    let filedconcat = `/${this.appid}/${this.bucket}/${filed}`;
    return 'a=200001&b=newbucket&k=AKIDUfLUEUigQiXqm7CVSspKJnuaiIKtxqAv&e=1437995704&t=1437995644&r=2081660421&f=';   // test
  // return `a=${this.appid}&b=${this.bucket}&k=${this.secretid}&t=${currentTime}&e=${expTime}&r=${randomstr}&f=${filedconcat}`;
};

COS.prototype.getSignTmp = function(expTime, filed) {
  let str = crypto.createHmac('sha1', 'bLcPnl88WU30VY57ipRhSePfPdOfSruK').update(this.getOriginal(expTime, filed)).digest()+this.getOriginal();
  console.log(str);

  console.log('--------------------------------');
  console.log(new Buffer(str).toString('base64'));   //test
  return crypto.createHmac('sha1', this.secretkey).update(this.getOriginal(expTime, filed)).digest('base64');

}


COS.prototype.getSign = function(expTime, filed) {
  this.getSignTmp();
  // let signTmp = this.getSignTmp(expTime, filed) + this.getOriginal(expTime, filed);
  // console.log(new Buffer(signTmp).toString('base64'));
}

module.exports = COS;
