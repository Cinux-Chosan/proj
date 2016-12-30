const randomstring = require('randomstring'),
    crypto = require('crypto');

function COS(appid, secretid, secretkey, bucket) {
    this.appid = appid;
    this.secretid = secretid;
    this.secretkey = secretkey;
    this.bucket = bucket;

}

COS.prototype.getOriginal = function(expTime, fileid) {
    this.expTime = expTime = expTime || this.expTime;
    this.fileid = fileid = fileid || this.fileid || '';

    let currentTime = Math.round(new Date().getTime() / 1000),
        randomstr = randomstring.generate({
            charset: 'numeric',
            length: 10
        });
    fileid = fileid.startsWith('/') ? fileid.substring(1, fileid.length) : fileid;
    let fileidconcat = `/${this.appid}/${this.bucket}/${encodeURI(fileid)}`;
    return `a=${this.appid}&b=${this.bucket}&k=${this.secretid}&t=${currentTime}&e=${expTime}&r=${randomstr}&f=${fileidconcat}`;
};

COS.prototype.getSignTmp = function(expTime, fileid) {
    return crypto.createHmac('sha1', this.secretkey)
        .update(this.getOriginal(expTime, fileid))
        .digest(); // return buffer
}


COS.prototype.getSign = function(expTime, fileid) {
    let signtmp_buffer = this.getSignTmp(expTime, fileid),
        origin = this.getOriginal(expTime, fileid),
        buffer = Buffer.allocUnsafe(signtmp_buffer.length + Buffer.byteLength(origin, 'utf8'));
    signtmp_buffer.copy(buffer);
    buffer.write(origin, signtmp_buffer.length, 'utf8');
    return buffer.toString('base64');
}

COS.prototype.test = function() {
    const multi = 'a=200001&b=newbucket&k=AKIDUfLUEUigQiXqm7CVSspKJnuaiIKtxqAv&e=1437995704&t=1437995644&r=2081660421&f=';
    const multi_sha1 = crypto.createHmac('sha1', 'bLcPnl88WU30VY57ipRhSePfPdOfSruK').update(multi).digest();

    const buffer = Buffer.allocUnsafe(multi_sha1.length + Buffer.byteLength(multi, 'utf8'));
    multi_sha1.copy(buffer);
    buffer.write(multi, multi_sha1.length, 'utf8');
    return buffer.toString('base64');
}


exports = module.exports = COS;
