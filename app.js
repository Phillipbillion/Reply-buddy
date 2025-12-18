// Chat history container
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Random helper
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate Buddy reply
function generateReply(msg) {
  const m = msg.toLowerCase().trim();

  // 1️⃣ Identity / self questions
  if (
    m.includes("your name") ||
    m.includes("who are you") ||
    m.includes("what are you")
  ) {
    return "I’m Buddy. Think of me as a chill friend you can talk to — I listen, I think, and I reply honestly.";
  }

  // 2️⃣ Clear emotional signals
  if (/(sigh|tired|sad|lonely|broken|hurt)/.test(m)) {
    return random([
      "That sounds heavy. Want to talk about it?",
      "Yeah… that kind of sigh usually means something’s up.",
      "I’m here. You don’t have to carry it alone."
    ]);
  }

  // 3️⃣ Insults / aggression
  if (/(fool|idiot|stupid|mad)/.test(m)) {
    return random([
      "😂 Easy now. What got you fired up?",
      "Alright savage 😏 talk to me.",
      "I won’t take it personal — what’s really going on?"
    ]);
  }

  // 4️⃣ Debate / versus
  if (m.includes(" vs ") || m.includes("vs.")) {
    return random([
      "If I had to pick? I’d go with the one who adapts faster under pressure.",
      "That’s close, but mindset usually wins those battles.",
      "People argue stats, I look at instincts."
    ]);
  }

  // 5️⃣ Direct questions
  if (m.endsWith("?")) {
    return random([
      "Good question. What made you ask?",
      "Let me think… what’s your own take?",
      "I don’t know everything, but here’s how I’d think about it."
    ]);
  }

  // 6️⃣ Greetings (LOW priority)
  if (/^(hi|hello|hey|yo)\b/.test(m)) {
    return random([
      "Hey 🙂 how’s your day going?",
      "Yo 👋 what’s up?",
      "Hey. I’m here."
    ]);
  }

  // 7️⃣ Intelligent fallback
  return random([
    "Hmm 🤔 say more.",
    "I’m listening.",
    "That makes sense.",
    "Go on."
  ]);
}

// Add message to chat box
function addMessage(text, from = "buddy") {
  const div = document.createElement("div");
  div.classList.add("reply");
  div.innerHTML = `<strong>${from === "user" ? "You" : "Buddy"}:</strong> ${text}`;

  // Add action buttons if from Buddy
  if (from === "buddy") {
    const actions = document.createElement("div");
    actions.className = "actions";
    ["Copy", "Share", "Reply"].forEach(action => {
      const btn = document.createElement("button");
      btn.textContent = action;
      btn.onclick = () => {
        if (action === "Copy") navigator.clipboard.writeText(text);
        if (action === "Share") alert("Share feature coming soon!");
        if (action === "Reply") userInput.value = text;
      };
      actions.appendChild(btn);
    });
    div.appendChild(actions);
  }

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send button handler
sendBtn.addEventListener("click", () => {
  const msg = userInput.value.trim();
  if (!msg) return;

  addMessage(msg, "user");
  const reply = generateReply(msg);
  addMessage(reply, "buddy");
  userInput.value = "";
});
