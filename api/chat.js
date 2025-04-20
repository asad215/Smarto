
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 200
    });
    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "GPT error" });
  }
}
