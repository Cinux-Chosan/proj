var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

app.use(express.static('./fe/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.post('/login', function(req, res) {
  if (true) {
    res.cookie('uid', '1', { expires: new Date(Date.now() + 900000) });
    res.send(JSON.stringify({state: 1}));
  }
});

var server = app.listen(8801, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
