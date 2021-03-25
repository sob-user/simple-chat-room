const storage = localStorage.getItem('username');
const host = document.getElementById('host').innerText;

const socket = io();

if(!storage) {
    window.location = `${host}/config`;
}
else {
    socket.emit('user_joined', storage);
}

function displayMsg(msg, emitter) {
    const divMessage = document.getElementById('messages');
    const div = document.createElement('div');
    div.classList = 'msg';
    div.innerHTML = `${emitter}:`;
    const span = document.createElement('span');
    span.innerHTML = ` ${msg}`;
    divMessage.appendChild(div);
    div.appendChild(span);
    div.scrollIntoView();
}

function displatNumOfPeople(num) {
    const peopleOnline = document.getElementById('people-online');
    const toggleS = num > 1 ? 's' : '';
    peopleOnline.innerHTML = `${num} personne${toggleS} en ligne`
}

function sendMsg(msg, user) {
    socket.emit('msg', msg, user);
}

const input = document.getElementById('input');
window.addEventListener('keypress', (key) => {
    if(key.code === 'Enter' && input.value.length > 0) {
        sendMsg(input.value, storage);
        input.value = '';
    }
})
const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', () => {
    if(input.value.length > 0) {
        sendMsg(input.value, storage);
        input.value = '';
    }
});

socket.on('user_joined', (data) => {
    displatNumOfPeople(data.clientsConnected);
});

socket.on('user_left', (data) => {
    displatNumOfPeople(data.clientsConnected);
});

socket.on('msg', (data) => {
    displayMsg(data.msg, data.alias);
});