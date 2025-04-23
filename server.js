
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

const trainingDataPath = path.join(__dirname, 'james_training.txt');
const trainingData = fs.readFileSync(trainingDataPath, 'utf-8');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: 'Please provide a message.' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: trainingData },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ reply: "Sorry, I can't respond right now." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
