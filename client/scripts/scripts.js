import places from '../assets/places';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadingInterval;

function loader(el) {
  el.textContent = '';

  loadingInterval = setInterval(() => {
    el.textContent += '.';

    if (el.textContent === '....') {
      el.textContent = '';
    }
  }, 300);
}

function type(el, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      el.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexaDec = randomNumber.toString(16);

  return `id-${timestamp}-${hexaDec}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">

              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log('submit');
  console.log(form);
  const data = new FormData(form);
  console.log(typeof data.get('prompt'));
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));

  // request =
  form.reset();

  const uniqueId = generateId();
  chatContainer.innerHTML += chatStripe(true, ' ', uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);

  console.log(places);

  const response = await fetch('http://localhost:8001/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt:
        `Suppose you are an accomodation provider with some places:` +
        JSON.stringify(places) +
        `and I am a customer. I will ask and you will answer. My question: \n` +
        data.get('prompt'),
    }),
  });

  clearInterval(loadingInterval);
  messageDiv.innerHTML = ' ';

  if (response.ok) {
    const data = await response.json();
    const parsed = data.bot.trim();

    type(messageDiv, parsed);
  } else {
    const err = await response.text();

    messageDiv.innerHTML = 'Something went wrong';

    alert(err);
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
