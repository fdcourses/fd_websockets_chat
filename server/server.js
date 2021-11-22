const http = require('http');
const app = require('./app');
const Server = require('socket.io');

const { Message } = require('./models');
const { PORT, SOCKET_EVENTS } = require('./config');
const server = http.createServer(app);

const io = Server(server);

io.on('connection', (socket) => {
  console.log('connected')

  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async (newMessage) => {
    try {
      console.log(newMessage);

      const savedMessage = await Message.create(newMessage);

      io.emit(SOCKET_EVENTS.NEW_MESSAGE, { data: savedMessage });
    } catch (error) {
      io.emit(SOCKET_EVENTS.NEW_MESSAGE_ERRROR, error);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

server.listen(PORT, () => {
  console.log('Alive');
});
