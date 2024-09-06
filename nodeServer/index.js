const io = require('socket.io')(8000, {
    cors: {
        origin: 'https://chatapp-girdhar.netlify.app/',  // Allow all origins, or replace with the specific origin you want to allow
        methods: ['GET', 'POST']
    }
});

const users = {};

io.on('connection', socket => {
    // Event listener for when a user joins
    socket.on('user-joined', name => {
        console.log(name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // Event listener for sending messages
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, user: users[socket.id] });
    });

    // Optional: Event listener for disconnect
    socket.on('disconnect', name => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
});
