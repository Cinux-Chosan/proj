function processUserInput(chatApp, socket) {
  let message = $('#send-message').val(),
    systemMessage = null;
  if (message.charAt(0) == '/') {
    systemMessage = chatApp.processCommand(message);
    if (systemMessage) {
      $('#messages').append(divSystemContentElement(systemMessage));
    }
  } else {
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscapedContentElement(message));
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }
  $('#send-message').val('');
}

let socket = io.connect('localhost:9000');

$(document).ready(function() {
  let chatApp = new Chat(socket);
  socket.on('nameResult', result => {
    let message = null;
    if (result.success) {
      message = 'You are now known as ' + result.name + '.';
    } else {
      message = result.message;
    }
    $('#messages').append(divSystemContentElement(messages));
  });

  socket.on('joinResult', result => {
    $('#room').text(result.room);
    $('#messages').append(divSystemContentElement('Room changed.'));
  });

  socket.on('message', messages => {
    console.log(socket.id);
    let newElement = $('<div>').text(messages.text);
    $('#messages').append(newElement);
  });

  socket.on('rooms', rooms => {
    $('#room-list').empty();
    for (let room in rooms) {
      room = room.substring(0, room.length);
      if (room != '') {
        $('#room-list').append(divEscapedContentElement(room));
      }
    }
    $('#room-list div').click(function() {
      chatApp.processCommand('/join' + $(this).text());
      $('#send-message').focus();
    });
  });

  setInterval(() => socket.emit('rooms'), 1000);

  $('#send-message').focus();

  $('#send-form').submit(() => {
    processUserInput(chatApp, socket);
    return false;
  });
});
