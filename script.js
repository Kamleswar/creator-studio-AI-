async function generateCaption() {
  const prompt = document.getElementById("prompt").value.trim();
  const result = document.getElementById("result");

  if (!prompt) {
    result.innerHTML = "⚠️ Please enter a topic.";
    return;
  }

  result.innerHTML = "⏳ Generating caption...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    const data = await response.json();

    if (data.caption) {
      result.innerHTML = data.caption;
    } else if (data.error) {
      result.innerHTML = "❌ " + data.error;
    } else {
      result.innerHTML = "❌ Failed to generate caption.";
    }

  } catch (error) {
    result.innerHTML = "❌ Connection error: " + error.message;
  }
}

function copyCaption() {
  const text = document.getElementById("result").innerText;

  if (!text || text.startsWith("⏳") || text.startsWith("⚠️")) {
    alert("No caption to copy.");
    return;
  }

  navigator.clipboard.writeText(text);
  alert("✅ Caption copied!");
}