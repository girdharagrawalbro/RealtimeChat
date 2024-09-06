const socket = io('https://realtimechat-ky13.onrender.com');
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.messagebox');
var audio = new Audio('audio.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position = 'text-start')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'text-end')
    socket.emit('send', message);
    messageInput.value = "";
})

const data = prompt("Enter your name to join");
socket.emit('user-joined', data);

socket.on('user-joined', name => {
    append(`${name} has joined the chat`, 'text-start');
});

socket.on('receive', data => {
    append(`${data.user}: ${data.message}`, 'text-start');
});

socket.on('user-left', name => {
    append(`${name} left the chat`, 'text-start');
});