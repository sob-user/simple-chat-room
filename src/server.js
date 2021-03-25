const app =  require('./app.js');
const server = require('http').createServer(app);
const io =  require('socket.io')(server);
const socketIo = require('./socket/middleware');

require('dotenv').config();

const Port = process.env.PORT;

server.listen(Port, () => {
    console.log(`Server started on port: ${Port}`);
});

socketIo(io);