const app = require ('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const m = (name, text, id) => ({ name, text, id}); 
const users = require('./users')();

io.on('connection', socket => {
  socket.on("userJoined", (data, cb) => {
    if (!data.name || !data.room) {
      return cb('Error with Data')
    } else {
      socket.join(data.room);
      users.remove(socket.id);
      users.add({
        id: socket.id,
        name: data.name,
        room: data.room
      });
      cb({ userId: socket.id })
      socket.emit('newMessage', m('admin', `Hello, ${data.name}.`))

      socket.broadcast
        .to(data.room)
        .emit('newMessage', m('admin', `User, ${data.name} entered.`))
    }

  })

  socket.on('createMessage', (data, cb) => {
  if (!data.text) {
    return cb("Text can't be empty..");
  }
  const user = users.get(data.id);
  if (user){
    io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    cb()
  })
});

module.exports = {
  app,
  server
};