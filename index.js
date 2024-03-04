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

let latestText = "";

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.emit('updatedText', latestText);

    socket.on('updateText', (text) => {
        latestText = text;
        io.emit('updatedText', text);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});