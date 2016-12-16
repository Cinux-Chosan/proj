let socketio = require('socket.io'),
  io = null,
  guestNumber = 1,
  nickNames = {},
  namesUsed = [],
  currentRoom = {};


exports.listen = function(server) {
  // 启动socket服务，并将其搭载到已有http服务上
  io = socketio.listen(server);
  // io.set('log level', 1);

  // 处理连接逻辑
  io.sockets.on('connection', function(socket) {

    // 当用户连接时，为其赋予一个访客名
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

    // 用户连接时将其放入聊天室 Lobby
    joinRoom(socket, 'Lobby');

    // 处理用户消息，更名以及聊天室的创建和变更
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);

    // 用户发出请求时，向其提供已经被占用的聊天室列表
    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.adapter.rooms);
    });

    // 定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};


// --------- 以下是功能函数实现 ---------

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {

  // 生成新昵称，规则为 Guest加数字
  let name = 'Guest' + guestNumber;

  // 将用户与客户端连接id关联
  nickNames[socket.id] = name;

  // 通知用户，让他们知道自己的昵称
  socket.emit('nameResult', {
    success: true,
    name
  });

  namesUsed.push(name);
  return ++ guestNumber;
}


function joinRoom(socket, room) {

  // 让用户进入房间
  socket.join(room);

  // 记录用户当前房间
  currentRoom[socket.id] = room;

  // 通知用户进入了新房间
  socket.emit('joinResult', { room });

  // 让同房间的其他用户知道有新用户进入房间
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' has joined ' + room + '.'
  });


  let usersInRoom = io.sockets.adapter.rooms[room];

    // 如果不止一个用户在房间里，那么汇总下都是谁
  if (usersInRoom.length > 1) {
    let usersInRoomSummary = 'Users currently in ' + room + ':';
    for (let index in usersInRoom) {
      let userSocketId = usersInRoom[index].id;
      if (userSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    usersInRoomSummary += '.';

    // 将房间里面其他用户的汇总信息发送给该用户
    socket.emit('message', { text: usersInRoomSummary });
  }

  // io.sockets.in(room).clients((err, clients) => {
  //   let usersInRoom = clients;
  //
  //   // 如果不止一个用户在房间里，那么汇总下都是谁
  //   if (usersInRoom.length > 1) {
  //     let usersInRoomSummary = 'Users currently in ' + room + ':';
  //     for (let index in usersInRoom) {
  //       let userSocketId = usersInRoom[index].id;
  //       if (userSocketId != socket.id) {
  //         if (index > 0) {
  //           usersInRoomSummary += ', ';
  //         }
  //         usersInRoomSummary += nickNames[userSocketId];
  //       }
  //     }
  //     usersInRoomSummary += '.';
  //
  //     // 将房间里面其他用户的汇总信息发送给该用户
  //     socket.emit('message', { text: usersInRoomSummary });
  //   }
  //
  // });
}


function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  socket.on('nameAttempt', function(name) {

    // 修改的昵称不能以 Guest 开头
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    } else {
      if (namesUsed.indexOf(name) == -1) {
        let previousName = nickNames[socket.id],
          previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' is now known as ' + name + '.'
        });
      } else {
        socket.emit('nameResult', {
          success: false,
          message: 'That nmame is already in use.'
        });
      }
    }
  });
}

// 转发消息
function handleMessageBroadcasting(socket) {
  socket.on('message', message => {
    console.log(socket.id);
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ':' + message.text
    });
  });
}


/* 更换房间 */
function handleRoomJoining(socket) {
  socket.on('join', room => {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  })
}


/* 断开连接 */
function handleClientDisconnection(socket) {
  socket.on('disconnect', () => {
    let nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  })
}
