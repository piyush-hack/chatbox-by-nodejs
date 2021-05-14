const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.message-accepted');
var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
    if (position != 'right') {
        audio.play();
    }
}




const myname = prompt("enter name to join");

if (myname != null) {


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        append(`You : ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    })

    socket.emit('new-user-joined', myname);
    append(`You joined as ${myname}`, 'centre');
    console.log('worked');
    socket.on('user-joined', name => {
        append(`${name} joined the chat`, 'centre');
        console.log('method called');
    })


    socket.on('receive', data => {
        append(`${data.name} : ${data.message}`, 'left');
        console.log('method called');

    })

    socket.on('userleft', data => {
        append(`${data} left!`, 'centre');
        console.log('method called');

    })

}

