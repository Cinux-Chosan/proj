var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;
var server = http.createServer(function(req, res) {
  var url = parse(req.url);
  var path = join(root, url.pathname);
  var stream = fs.createReadStream(path);
  {  // 实现1：
    stream.on('data', function(chunk) {
      res.write(chunk);
    });
    stream.on('end', function() {
      res.end();
    });
  }
  {  // 实现2：
    // stream.pipe(res);
  }
  stream.on('error', function(err) {
    res.statusCode = 500;
    res.end('Internal Server Error');
  });

});

server.listen(8888, function() {
  console.log('server running on port: 8888');
});


// curl http://localhost:8888/static_server.js -i
