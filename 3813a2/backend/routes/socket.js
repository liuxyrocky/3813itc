const socket_io = require('socket.io');

exports.listen = function (server) {
    const io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        socket.on('user join', function (data) {
            socket.emit('122121');
        })
    });
};
