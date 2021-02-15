const io = require('socket.io')(5000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    socket.on('new-user', data => {
        socket.broadcast.emit('user-joined', { message: `${data.name} has joined the chat`, room: data.room })
    })

    socket.on('send-message', data => {
        socket.broadcast.emit('new-message', data)
    })
})