import axios from 'axios';
import { useEffect, useState } from 'react';
const AI = () => {
  const [placeArray, setPlaces] = useState([]);

  const getPlaces = async () => {
    const { data } = await axios.get('/places');
    setPlaces(data.places);
  };

  useEffect(() => {
    getPlaces();
  }, []);
  const places = placeArray.map(
    ({ title, address, price, description, perks }) => ({
      title,
      address,
      price,
      description,
      perks,
    })
  );
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
  <div id=${uniqueId} class = "border w-full p-5">${value}</div>
  `;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const chatContainer = document.querySelector('#chat_container');

    const data = new FormData(form);
    chatContainer.innerHTML +=
      '<b>You: </b>' + chatStripe(false, data.get('prompt'));

    form.reset();

    const uniqueId = generateId();
    chatContainer.innerHTML +=
      '<b>Chatbot: </b>' + chatStripe(true, ' ', uniqueId);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv);

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

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div id="app" className="mx-8">
      <div id="chat_container"></div>
      <form id="form">
        <textarea
          name="prompt"
          placeholder="Ask Something..."
          cols="1"
          rows="1"
          onKeyDown={handleKeyDown}
        ></textarea>
        {/* <button
          type="submit"
          onClick={handleSubmit}
          className="font-semibold border border-black px-4 py-2 rounded-lg bg-transparent hover:bg-slate-100 hover:transition-all"
        >
          Click
        </button> */}
      </form>
    </div>
  );
};

export default AI;
