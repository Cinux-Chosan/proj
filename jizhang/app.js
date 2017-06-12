var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
const mmt = require('moment');
const mongo = require('mongodb');
const { connect } = require('./mongodb_connect');
const { error, ok, findBy, removeBy, getMD5 } = require('./server_utils');
const assert = require('assert');
const objId = mongo.ObjectId;
var app = express();
const { stringify: json } = JSON;

let loged = [];
const expireTime = 1000 * 60 * 30;
app.use(express.static('./fe/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {  // 根据 token 刷新用户登录时间
    let { token, uid } = req.cookies;
    let logedUser = loged[findBy]('token', token);
    if (logedUser) {  // 用户登录
      if ((new Date(logedUser.recentReqTime + expireTime)) < (new Date())) {  // 用户登录已过期
        loged[removeBy]('token', logedUser.token);
        res.send(error('登录过期，请重新登录!'));
      } else {
        res.cookie('uid', uid, { expires: new Date(Date.now() + expireTime)});
        res.cookie('token', token, { expires: new Date(Date.now() + expireTime)});
        logedUser.recentReqTime = Date.now();
      }
    } else {
      // res.send(error('您未登陆，请登陆!'));
    }
    next();
});

// 用户登录
app.post('/login', function(req, res) {
  let { user_name, pwd } = req.body;
  if (user_name && pwd) {
    connect((db, cb) => {
      let users = db.collection('users');
      pwd = getMD5(pwd);
      users.findOne({ user_name, pwd }, {fields: { user_name: 1, pwd: 1}}, (err, doc) => {
        if (doc) {
          let token = getMD5(Date.now() - 1497093035167);
          let uid = doc._id;
          res.cookie('uid', uid, { expires: new Date(Date.now() + expireTime)});
          res.cookie('token', token, { expires: new Date(Date.now() + expireTime)});
          loged.push({ token, uid, recentReqTime: Date.now() });
          res.send(json({state: 1, msg: '成功登录!'}));
        } else {
          res.send(error('用户名或密码错误!'));
        }
        cb();
      });
    });
  } else {
    res.send(error('请输入完整的用户名和密码!'));
  }
});

// 退出登录
app.get('/logout', (req, res) => {
  let { uid } = req.cookie;
  loged[removeBy]('uid', uid);
  res.send(json({state: 1, msg: '登出成功!'}));
});

// 用户注册
app.post('/signUp', (req, res) => {
  let { user_name, pwd } = req.body;
  if (user_name && pwd) {
    connect((db, cb) => {
      let users = db.collection('users');
      let cursor = users.find({ user_name });
      cursor.toArray((err, docs) => {
        if (docs.length) {
          cb();
          res.send(json({state: 0, msg: '该账号已经注册!'}));
        } else {
          pwd = getMD5(pwd);
          console.log(pwd);
          users.insertOne({ user_name, pwd }, () => {
            cb();
            res.send(json({state: 1, msg: '注册成功!'}));
          });
        }
      });
    });
  } else {
    res.send(error('用户名或密码缺失，请完整填写!'));
  }
});

// 保存提交
app.post('/submitEdit', function(req, res) {
  let { records = [], record_id, title } = req.body;
  let { uid } = req.cookies;
  let create_time = Date.now();
  // let sum = records.reduce((a, b) => {
  //   let bMoney = b.type == 'in' ? Number(b.money) : - Number(b.money);
  //   return a + (bMoney ? bMoney : 0);
  // }, 0);
  let sum = 0, incomes = 0, outcomes = 0;
  records.forEach(el => {
    let money = el.type == 'in' ? Number(el.money) : - Number(el.money);
    money = money ? money : 0;
    el.type == 'in' ? incomes += money : outcomes += money});
  sum = incomes + outcomes;
  connect((db, cb) => {
    let collection_records = db.collection('records');
    let doc = { uid, create_time, sum, incomes, outcomes, records, title };
    record_id = record_id == 0 ? 0 : record_id;
    let pattern = record_id ? ({ _id: record_id }) : ({ create_time });
    collection_records.updateOne(pattern, doc, { upsert: true, w: 1 }, (err, r = {}) => {
      if (r.result.ok || r.result.nModified) {
        res.send(ok({ state: 1, msg: '保存成功!' }));
      }
      cb();
    });
  });
});

// 获取数据
app.get('/getAllRecords', (req, res) => {
  let { date_begin, date_end } = req.body;
  let { uid } = req.cookies;
  connect((db, cb) => {
    let collection_records = db.collection('records');
    let cursor = collection_records.find({ uid }).project({uid: 0, records: 0}); // 返回数据排除 uid 字段
    cursor.toArray((err, docs) => {
      cb();
      res.send(ok(docs));
    });
  });
});

// 根据记录 id 进行查询
app.get('/getRecordById', (req, res) => {
  let { _id } = req.query;
  connect((db, cb) => {
    let collection_records = db.collection('records');
    _id = objId(_id);
    collection_records.findOne({ _id }, {fields: {records: 1, incomes:1, outcomes: 1, sum: 1}}, (err, doc) => {
      cb();
      let data = Object.assign({ state: 1}, doc);
      res.send(ok(data));
    });
  });
})

var server = app.listen(8801, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
