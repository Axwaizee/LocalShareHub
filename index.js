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

function formatDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
}

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


io.on('connection', (socket) => {
    console.log(`\x1b[93m[${formatDateTime()}]\x1b[0m \x1b[92mA user connected from IP: ${socket.handshake.address}\x1b[0m`);

    socket.emit('updatedText', latestText);

    socket.on('updateText', (text) => {
        latestText = text;
        console.log(`\x1b[93m[${formatDateTime()}]\x1b[0m \x1b[94mText was updated from IP: ${socket.handshake.address}\x1b[0m`);
        io.emit('updatedText', text);
    });

    socket.on('disconnect', () => {
        console.log(`\x1b[93m[${formatDateTime()}]\x1b[0m \x1b[91mUser disconnected from IP: ${socket.handshake.address}\x1b[0m`);
    });
});


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});