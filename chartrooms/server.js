const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  mime = require('mime'),
  chatServer = require('./lib/chat_server'),
  config = require('./lib/config');
let cache = {},
  port = config.serverPort,
  server = http.createServer(function(req, res) {
    let filePath = false;
    if (req.url == '/') {
      filePath = 'public/index.html';
    } else {
      filePath = 'public'+ req.url;
    }
    let absPath = './' + filePath;
    serverStatic(res, cache, absPath);
  });


server.listen(port, function() {
  console.log('server listen on port: ' + port);
});

chatServer.listen(server);


// ------ 以下为功能函数实现 ------

function send404(res) {
  res.writeHead(404, {"Content-Type": "text-plain"});
  res.end("Error 404: resource not found.");
}


function sendFile(res, filePath, fileContents) {
  res.writeHead(200, {"Content-Type": mime.lookup(path.basename(filePath))});
  res.end(fileContents);
}

function serverStatic(res, cache, absPath) {
  if (cache[absPath]) {
    sendFile(res, absPath, cache[absPath]);
  }
  else {
    fs.exists(absPath, function(exists) {
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(res);
          } else {
            cache[absPath] = data;
            sendFile(res, absPath, data);
          }
        });
      } else {
        send404(res);
      }
    });
  }
}
