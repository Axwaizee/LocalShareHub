require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server, {
    connectionStateRecovery: {}
});
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('updateText', (text) => {
        io.emit('updatedText', text);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server running on http://192.168.29.7:${PORT}`);
});