const ws = require('ws');
require('dotenv').config();

const wss = new ws.Server({
    port: process.env.PORT,
}, () => console.log(`Server started on port ${process.env.PORT}`))

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
