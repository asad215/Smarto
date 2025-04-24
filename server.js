
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

// Load training data from file
const trainingData = fs.readFileSync(path.join(__dirname, 'james_training.txt'), 'utf-8');

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: trainingData },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    res.status(500).send('Error talking to GPT');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
