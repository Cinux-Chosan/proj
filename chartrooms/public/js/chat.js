let Chat = function(socket) {
  this.socket = socket;
}

/* 发送消息 */
Chat.prototype.sendMessage = function(room, text) {
  this.socket.emit('message', { room, text });
}


/* 改变房间 */
Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', { newRoom: room });
}

/* 处理命令 */
Chat.prototype.processCommand = function(cmd) {
  let words = cmd.split(' ');
  cmd = words[0].substring(1, words[0].length).toLowerCase();
  msg = false;
    switch (cmd) {
      case 'join':
        words.shift();
        let room = words.join(' ');
        this,changeRoom(room);
        break;

      case 'nick':
        words.shift();
        let name = words.join(' ');
        this.socket.emit('nameAttempt', name);
        break;

      default:
        msg = 'Unrecognized command.'
        break;
    }
    return msg;
};


/* 特殊字符转HTML实体 */
function divEscapedContentElement(msg) {
  return $('<div>').text(msg);
}

function divSystemContentElement(msg) {
  return $('<div>').html('<i>' + msg + '</li>');
}
