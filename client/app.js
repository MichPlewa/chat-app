const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const addMessageForm = document.getElementById('add-messages-form');
const messagesList = document.getElementById('messages-list');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getAnimations('message-content');

let userName = '';

const sendMessage = (e) => {
  e.preventDefault();

  if (!messageContentInput) {
    alert(`Message can't be empty`);
  } else {
    addMessage(userName, messageContentInput.value);
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');

  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
  }

  message.innerHTML = `
  <h3 class='message_author'>${userName === author ? 'You' : author}</h3>
  <div class='message_content'>${content}</div>`;

  messagesList.appendChild(message);
};

const login = (e) => {
  e.preventDefault();

  if (!userNameInput.value) {
    alert(`Log in can't be empty`);
  } else {
    userName = userNameInput.value;

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

loginForm.addEventListener('submit', (e) => {
  login(e);
});

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});
