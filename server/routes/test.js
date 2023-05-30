const emailjs = require('@emailjs/browser');
const express = require('express');
const app = express();
const sendEmail = async (req, res) => {
  try {
    console.log(req.body);
    const { email, name, message } = req.body;
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Airbnb-Clone',
      message,
    };
    const response = await emailjs.send(
      'service_3u9jc8g',
      'template_n3e4mq4',
      templateParams,
      'kmsOnKZc_4qIIxs9U'
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

app.use(express.json());

app.post('/send-email', sendEmail);

app.listen(3000, () => console.log('Server is running...'));
