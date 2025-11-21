import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// Test route
app.get("/", (req, res) => {
  res.send("Gemini HTTPS backend is running");
});

// Chat route using pure HTTPS
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // Gemini’s reply is nested deep, so extract safely
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";

    res.json({ reply });

  } catch (err) {
    console.error("HTTPS Gemini error:", err);
    res.json({ reply: "Server error." });
  }
});

app.listen(3000, () => {
  console.log("HTTPS Gemini backend running at http://localhost:3000");
});
