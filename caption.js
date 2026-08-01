export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      caption: "Method not allowed"
    });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      caption: "Gemini API Key configure nahi hui."
    });
  }

  const { topic } = req.body;

  const prompt = `
Tum ek professional social media creator ho.

Topic: ${topic}

Is topic ke liye:
1. Ek viral caption.
2. 10 trending hashtags.
3. 5 emojis.

Answer sirf Hindi me do.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
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
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const caption =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Caption generate nahi hua.";

    res.status(200).json({ caption });

  } catch (error) {
    res.status(500).json({
      caption: "Server Error: " + error.message
    });
  }
}