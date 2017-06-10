const crypto = require('crypto');
const { defineProperty: defProp, setPrototypeOf: setProto, getPrototypeOf: getProto } = Object;
const proto_array = getProto([]);
const proto_string = getProto('');
const proto_object = getProto({});
const set = (obj, key, val) => obj[key] = val;
const get = (obj, key) => obj[key];
const throwIfMissing = (missingParam = '', tip = '') => { throw new Error(`Missing parameter ${missingParam}, ${tip}`); };
const pip = (...funcs) => funcs.reduce((a, b) => b(a));  //  如果有初始值，初始值作为第一个参数

exports.getHash = () => crypto.createHash('md5');
exports.getMD5 = (val) => this.getHash().update(val.toString()).digest('hex');

let symbol_findBy = Symbol('findBy with ==, not ===');
defProp(proto_array, symbol_findBy, {
  get() {
    return (key = throwIfMissing('key'), val) => {
      let iter = (key, val) => el => get(el, key) == val;
      return this.find(iter(key, val));
    }
  }
});
exports.findBy = symbol_findBy;

let symbol_removeBy = Symbol('removeBy with ==, not ===');
defProp(proto_array, symbol_removeBy, {
  get() {
    return (key, val) => {
      return this.splice(this.findIndex(el => el[key] == val), 1);
    }
  }
});
exports.removeBy = symbol_removeBy;

exports.error = errMsg => ({ state: 0, msg: errMsg });
