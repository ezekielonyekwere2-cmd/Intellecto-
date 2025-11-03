
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await fetch("https://gemini.googleapis.com/v1/models/text-bison-001:generateText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.7,
        maxOutputTokens: 500
      })
    });
    const data = await response.json();
    res.json({ answer: data.candidates[0].content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
