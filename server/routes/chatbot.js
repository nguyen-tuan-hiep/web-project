const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello",
  });
});


router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });

    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

module.exports = router;