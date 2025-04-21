const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    console.error("OpenAI error:", err);
    res.status(500).json({ reply: "Sorry, I can't respond right now." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


Client-side code (JavaScript)

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatLog = document.getElementById("chat-log");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  // Display user message
  const userMessageElement = document.createElement("div");
  userMessageElement.textContent = `You: ${message}`;
  chatLog.appendChild(userMessageElement);

  try {
    // Send request to server
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    // Display bot response
    const botMessageElement = document.createElement("div");
    botMessageElement.textContent = `Bot: ${data.reply}`;
    chatLog.appendChild(botMessageElement);
  } catch (err) {
    console.error(err);
  }

  chatInput.value = "";
});


HTML

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chatbot</title>
  <style>
    #chat-log {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
      width: 300px;
      height: 400px;
      overflow-y: auto;
    }
  </style>
</head>
<body>
  <div id="chat-log"></div>
  <form id="chat-form">
    <input type="text" id="chat-input" placeholder="Type a message...">
    <button type="submit">Send</button>
  </form>

  <script src="script.js"></script>
</body>
</html>