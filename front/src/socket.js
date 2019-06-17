const io = require('socket.io')();

export default function start() {
    io.on('connection', socket => {
        console.log('Client is connected');
    });

    io.listen(8000);
    console.log('IO listening on port 8000');
}