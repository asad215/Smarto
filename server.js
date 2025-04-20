const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: "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"
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
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