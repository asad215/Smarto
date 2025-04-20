const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get reply" });
  }
});

app.listen(port, () => {
  console.log(James bot is live at http://localhost:${port});
});