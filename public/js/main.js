const chatForm = document.getElementById('chat-form')
const chatMessage = document.querySelector('.chat-messages')

const socket = io()

socket.on('message', (message)=>{
    console.log(message)
    outputMessage(message)

    // scroll down
    chatMessage.scrollTop = chatMessage.scrollHeight
})


chatForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    // pegando texto
    const msg = e.target.elements.msg.value
    // mandando texto pro backend
    socket.emit('chatMessage', msg)

    e.target.elements.msg.value = ''
})


// funtion outputMessage
function outputMessage(msg){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}