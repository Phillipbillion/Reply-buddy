const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chat = document.getElementById("chat");

sendBtn.addEventListener("click", reply);
input.addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    reply();
  }
});

function reply() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text);
  input.value = "";

  const response = generateReply(text);
  addMessage("Buddy", response, true);
}

function addMessage(sender, text, actions = false) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;

  if (actions) {
    const actionDiv = document.createElement("div");
    actionDiv.className = "reply-actions";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.onclick = () => navigator.clipboard.writeText(text);

    const shareBtn = document.createElement("button");
    shareBtn.textContent = "Share";
    shareBtn.onclick = () => {
      if (navigator.share) {
        navigator.share({ text });
      } else {
        alert("Sharing not supported here.");
      }
    };

    actionDiv.appendChild(copyBtn);
    actionDiv.appendChild(shareBtn);
    div.appendChild(actionDiv);
  }

  chat.prepend(div);
}

/* ===== BUDDY INTELLIGENCE ===== */

function generateReply(msg) {
  const m = msg.toLowerCase();

  // Greeting
  if (/(hi|hello|hey|yo)/.test(m)) {
    return random([
      "Hey 🙂 how’s your day going?",
      "Yo 👋 what’s up?",
      "Hey. I’m here."
    ]);
  }

  // Emotional
  if (/(tired|sad|lonely|broken|hurt)/.test(m)) {
    return random([
      "That sounds heavy. Want to talk about it?",
      "I hear you. What’s weighing on you?",
      "Yeah… that kind of tired hits different."
    ]);
  }

  // Insult / Roast
  if (/(fool|idiot|stupid)/.test(m)) {
    return random([
      "😂 Relax, no need for violence.",
      "If that’s how you feel, I’m listening.",
      "Alright savage 😏 what happened?"
    ]);
  }

  // Debate / Vs
  if (m.includes("vs")) {
    return random([
      "If I had to pick? I’d choose the one with better adaptability.",
      "That matchup is close, but instinct usually beats planning.",
      "Honestly? Power matters less than mindset in that fight."
    ]);
  }

  // Question
  if (m.endsWith("?")) {
    return random([
      "Good question. What made you think of that?",
      "Let me think… what’s your own take?",
      "I don’t have the full answer, but here’s how I see it…"
    ]);
  }

  // Default intelligent fallback
  return random([
    "Hmm 🤔 say more.",
    "Interesting. Go on.",
    "That makes sense.",
    "I see where you’re coming from."
  ]);
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
    }
