export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      prompt,
      language = "English",
      tone = "Viral",
      emoji = true
    } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Topic is required."
      });
    }

    const aiPrompt = `
Create exactly 5 unique social media captions.

Topic: ${prompt}
Language: ${language}
Tone: ${tone}
Emoji: ${emoji ? "Yes" : "No"}

Also include:
- 10 relevant hashtags
- A short Call To Action (CTA)

Format the response clearly.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: aiPrompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Gemini API Error"
      });
    }

    const caption =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Caption could not be generated.";

    return res.status(200).json({ caption });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}