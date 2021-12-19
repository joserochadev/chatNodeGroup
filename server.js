const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')

const app = express()
const PORT = 3000 || process.env.PORT
const server = http.createServer(app)
const io = socketio(server)

let chatName = 'chatCord Bot'

// definindo arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket)=>{
    console.log(`Socket conectado:${socket.id}`)

    // socket.emit('message',' hello')

    socket.broadcast.emit('message', formatMessage(chatName,'Um novo participante entrou'))

    // recebendo um evento quando alguem se desconectar
    socket.on('disconnect', ()=>{
        // mandando uma mensagem pra todos que um participante saiu
        io.emit('message', formatMessage(chatName,'Um participante saiu'))
    })

    // recebendo uma mensagem do front
    socket.on('chatMessage', (msg)=>{
        // mandando a mensagem recebida para todos no grupo
        io.emit('message', formatMessage(chatName, msg))
    })
})



server.listen(PORT, ()=>{console.log(`server rodando na porta ${PORT}`)})