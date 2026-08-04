async function generateCaption() {
  const prompt = document.getElementById("prompt").value.trim();
  const language = document.getElementById("language").value;
  const tone = document.getElementById("tone").value;
  const emoji = document.getElementById("emoji").checked;
  const result = document.getElementById("result");

  if (!prompt) {
    result.innerHTML = "⚠️ Please enter a topic.";
    return;
  }

  result.innerHTML = "⏳ Generating captions...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        language,
        tone,
        emoji
      })
    });

    const data = await response.json();

    if (response.ok && data.caption) {
      result.innerHTML = `<pre>${data.caption}</pre>`;
    } else {
      result.innerHTML = "❌ " + (data.error || "Failed to generate captions.");
    }

  } catch (error) {
    result.innerHTML = "❌ Connection error: " + error.message;
  }
}

function copyCaption() {
  const text = document.getElementById("result").innerText;

  if (!text || text.includes("Generating")) {
    alert("No caption to copy.");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(() => alert("✅ Caption copied!"))
    .catch(() => alert("❌ Copy failed."));
}