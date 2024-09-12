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
    if(position === 'text-start')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
      
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('send', message); // Emit the message to the server
        append(`You: ${message}`, 'text-end')
        messageInput.value = ''; // Clear the input field
    }

})

let data;
do {
    data = prompt("Enter your name to join");
} while (!data);

socket.emit('user-joined', data);

socket.on('user-joined', name => {
    append(`${name} has joined the chat`, 'text-start');
});

socket.on('receive', data => {
    append(`${data.user}: ${data.message}`, 'text-start');
         
        messageBox.scrollTop = messageBox.scrollHeight;

});

socket.on('user-left', name => {
    if (name) {
        append(`${name} left the chat`, 'text-start');
    } else {
        append(`A user left the chat`, 'text-start');
    }
});
