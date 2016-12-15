const http = require('http'),
  exp = require('express'),
  app = exp(),
  io = require('socket.io');

let srv_exp = http.Server(app),
  srv_io = io(srv_exp);

srv_exp.listen(9000, () => console.log('listen on 9000'));


app.use(exp.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


srv_io.of('/mychatroom').on('connection', socket => {
  console.log(srv_io.nsps['/mychatroom']);
  socket.emit('hi', "who are you?");
  socket.on('hi', data => {
    console.log(data);
    srv_io.of('/mychatroom').emit('hi', data);
  });
});
