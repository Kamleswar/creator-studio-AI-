export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: "Gemini API key configure nahi hui."
    });
  }

  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        error: "Topic required hai."
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        API_KEY,
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
                  text:
                    "Create a catchy social media caption for this topic: " +
                    topic +
                    ". Make it engaging, short, and suitable for Assam creators. Include relevant hashtags."
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
        error: data?.error?.message || "Gemini API error"
      });
    }

    const caption =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      caption: caption || "Caption generate nahi hua."
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error"
    });
  }
}