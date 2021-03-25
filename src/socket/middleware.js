function socketIo(io)  {
    io.on('connection', function(socket) {
        let clientsConnected = io.engine.clientsCount;

        socket.on('user_joined', function(alias) {
            socket.broadcast.emit('user_joined', {clientsConnected ,alias});
            socket.emit('user_joined', {clientsConnected ,alias});
        });

        socket.on('msg', function(msg, alias) {
            socket.broadcast.emit('msg', {alias, msg});
            socket.emit('msg', {alias, msg});
        });

        socket.on('disconnect', function() {
            socket.broadcast.emit('user_left', {clientsConnected: clientsConnected - 1});
        });
    });
}

module.exports = socketIo;