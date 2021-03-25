const storage = localStorage.getItem('username');
const host = document.getElementById('host').innerText;

if(storage) window.location = `${host}/chat`;

const configForm = document.getElementById('config-form');
const input = document.getElementById('input');
const formSubmit = document.getElementById('form-submit');
let error = false;

input.addEventListener('focus', () => {
    configForm.style.border = '1px solid #612dbd';
});

input.addEventListener('focusout', () => {
    configForm.style.border = '1px solid lightgray';
});

input.addEventListener('input', () => {
    let username = input.value;
    if(username.length > 0) {
        error = false;
        formSubmit.style.background = '#612dbd';
        formSubmit.style.color = 'white';
        formSubmit.style.cursor = 'pointer';
    }
    else {
        error = true;
        formSubmit.style.background = 'white';
        formSubmit.style.color = 'lightgray';
        formSubmit.style.cursor = 'default';
    }
});

formSubmit.addEventListener('click', () => {
    let username = input.value;
    if(!error && username.length > 0) {
        localStorage.setItem('username', username);
        window.location = `${host}/chat`;
    }
});