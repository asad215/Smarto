
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

const trainingData = fs.readFileSync(path.join(__dirname, 'james_training.txt'), 'utf-8');

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are James, an AI assistant for Smarto.Space. You help with customer service, lead collection, and FAQs. Always reply helpfully.' },
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
        console.error("Error from OpenAI:", error.message);
        res.status(500).send('Sorry, I can’t respond right now.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
