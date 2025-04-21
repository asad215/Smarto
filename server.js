const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI with project-based API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-pYxVWjV12ievTkprMqBbNh1l",
  project: "proj_qCRecjF43LaSQQFZHU16B549"
});

app.get("/", (req, res) => {
  res.send("James Chatbot is running.");
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ reply: "Sorry, I can't respond right now." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});