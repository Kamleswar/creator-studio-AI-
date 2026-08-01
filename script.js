document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".card button");

  buttons.forEach(function (button, index) {

    button.addEventListener("click", function () {

      if (index === 0) {
        openCaption();
      } else {
        const card = button.closest(".card");
        const title = card.querySelector("h3").innerText;

        alert(title + " tool jaldi available hoga 🚀");
      }

    });

  });


  const rewardButton = document.querySelector(".reward button");

  if (rewardButton) {
    rewardButton.addEventListener("click", function () {
      alert("🎁 20 AI Credits claimed!");
    });
  }

});


function openCaption() {

  const captionScreen = document.getElementById("captionScreen");
  const tools = document.getElementById("tools");
  const welcome = document.querySelector(".welcome");
  const searchBox = document.querySelector(".search-box");
  const reward = document.querySelector(".reward");

  if (captionScreen) {
    captionScreen.classList.add("active");
  }

  if (tools) tools.style.display = "none";
  if (welcome) welcome.style.display = "none";
  if (searchBox) searchBox.style.display = "none";
  if (reward) reward.style.display = "none";

  window.scrollTo(0, 0);
}


function closeCaption() {

  const captionScreen = document.getElementById("captionScreen");
  const tools = document.getElementById("tools");
  const welcome = document.querySelector(".welcome");
  const searchBox = document.querySelector(".search-box");
  const reward = document.querySelector(".reward");

  if (captionScreen) {
    captionScreen.classList.remove("active");
  }

  if (tools) tools.style.display = "";
  if (welcome) welcome.style.display = "";
  if (searchBox) searchBox.style.display = "";
  if (reward) reward.style.display = "";

  window.scrollTo(0, 0);
}


async function generateCaption() {

  const topic = document.getElementById("captionTopic").value.trim();
  const result = document.getElementById("captionResult");

  if (!topic) {
    result.innerHTML = "⚠️ Pehle topic likhiye.";
    return;
  }

  result.innerHTML = "⏳ AI caption bana raha hai...";

  try {

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic: topic
      })
    });

    const data = await response.json();

    if (!response.ok) {
      result.innerHTML =
        "❌ Error: " + (data.error || "AI response nahi mila.");
      return;
    }

    result.innerHTML =
      "✨ AI Caption:<br><br>" +
      (data.caption || "Caption generate nahi hua.");

  } catch (error) {

    result.innerHTML =
      "❌ Connection error: " + error.message;

  }
}


function copyCaption() {

  const result = document.getElementById("captionResult");

  const text = result.innerText;

  navigator.clipboard.writeText(text).then(function () {

    alert("📋 Caption copied!");

  }).catch(function () {

    alert("Caption copy nahi ho paya.");

  });

}