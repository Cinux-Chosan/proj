var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
const mmt = require('moment');
const { connect } = require('./mongodb_connect');
const { error, findBy, removeBy, getMD5 } = require('./server_utils');
const assert = require('assert');
var app = express();
const { stringify: json } = JSON;

let loged = [];
const expireTime = 1000 * 60 * 30;
app.use(express.static('./fe/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {  // 根据 token 刷新用户登录时间
    let token = req.cookies.token;
    let logedUser = loged[findBy]('token', token);
    if (logedUser) {  // 用户登录
      if ((new Date(logedUser.recentReqTime + expireTime)) < (new Date())) {  // 用户登录已过期
        loged[removeBy]('token', logedUser.token);
        res.send(error('登录过期，请重新登录！'));
      } else {
        logedUser.recentReqTime = Date.now();
      }
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
          res.send(json({state: 1, msg: '成功登录！'}));
        } else {
          res.send(error('用户名或密码错误！'));
        }
        cb();
      });
    });
  } else {
    res.send(error('请输入完整的用户名和密码！'));
  }
});

// 退出登录
app.get('/logout', (req, res) => {
  let { uid } = req.cookie;
  loged[removeBy]('uid', uid);
  res.send(json({state: 1, msg: '登出成功！'}));
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
          res.send(json({state: 0, msg: '改账号已经注册！'}));
        } else {
          pwd = getMD5(pwd);
          console.log(pwd);
          users.insertOne({ user_name, pwd }, () => {
            cb();
            res.send(json({state: 1, msg: '注册成功！'}));
          });
        }
      });
    });
  } else {
    res.send(json(error('用户名或密码缺失，请完整填写！')));
  }
});

app.post('/submitEdit', function(req, res) {
  let { records = [], records_id } = req.body;
  let { uid } = req.cookie;
  let date = Date.now();
  let sum = records.reduce((a, b) => {
    bMoney = b.type == 'in' ? Number(b.money) : - Number(b.money);
    return a + bMoney;
  }, 0);
  connect((db, cb) => {
    let records = db.collection('records');
    let doc = { uid, date, sum , records };
    console.log(doc);
    records.updateOne({ _id: records_id }, doc, { upsert: 1 }, (err, r) => {
      console.log('r', r);
      res.send(json(r));
      cb();
    });
  });
});
var server = app.listen(8801, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

function queryUser(uid) {

}
