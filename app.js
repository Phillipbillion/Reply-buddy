document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const chatList = document.getElementById("chat-list");

  const memory = JSON.parse(localStorage.getItem("buddyMemory")) || [];
  const personality = JSON.parse(localStorage.getItem("buddyPersonality")) || { playful:0, serious:0, thoughtful:0 };

  // Render previous messages
  memory.forEach(item => renderMessage(item.text, item.sender));

  // Send button
  sendBtn.addEventListener("click", () => {
    sendMessage();
  });

  // Press Enter to send
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const message = input.value.trim();
    if (!message) return;  // Ignore empty input
    input.value = "";

    addMessage("user", message);

    // Buddy reply after small delay
    setTimeout(() => {
      const reply = generateBuddyReply(message);
      addMessage("buddy", reply);

      // Save memory
      localStorage.setItem("buddyMemory", JSON.stringify(memory));
      localStorage.setItem("buddyPersonality", JSON.stringify(personality));
    }, 200 + Math.random() * 400);
  }

  function addMessage(sender, text) {
    memory.push({ sender, text });
    renderMessage(text, sender);
  }

  function renderMessage(text, sender) {
    const li = document.createElement("li");
    li.classList.add("chat-item", sender === "user" ? "user-msg" : "buddy-msg");

    const span = document.createElement("span");
    span.textContent = text;
    li.appendChild(span);

    const actions = document.createElement("div");
    actions.classList.add("action-btns");

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => navigator.clipboard.writeText(text));
    actions.appendChild(copyBtn);

    const shareBtn = document.createElement("button");
    shareBtn.textContent = "Share";
    shareBtn.addEventListener("click", () => {
      if (navigator.share) navigator.share({ text });
      else alert("Share not supported on this browser");
    });
    actions.appendChild(shareBtn);

    const replyBtn = document.createElement("button");
    replyBtn.textContent = "Reply";
    replyBtn.addEventListener("click", () => {
      input.value = text;
      input.focus();
    });
    actions.appendChild(replyBtn);

    li.appendChild(actions);
    chatList.appendChild(li);
    chatList.scrollTop = chatList.scrollHeight;
  }

  function generateBuddyReply(message) {
    const intent = detectIntent(message);
    updatePersonality(intent);

    const history = memory.slice(-5).map(m => m.text.toLowerCase()).join(" ");

    const pools = {
      short: ["Hey.", "Yeah?", "What’s up?", "I’m listening."],
      question: ["Good question.", "Depends—what’s the situation?", "Let’s think about that.", "I’d say it varies."],
      joking: ["😂 alright, fair", "I see what you did there", "You’re not wrong", "Haha, I like that."],
      hostile: ["Alright, what’s going on?", "Let’s slow it down.", "I’m here to help, not fight.", "Take a breath."],
      dismissive: ["You don’t sound convinced.", "Something off?", "Say it straight.", "Hmm, okay."],
      neutral: ["I hear you.", "Go on.", "That makes sense.", "I’m listening.", "Got it."]
    };

    const pool = pools[intent] || pools.neutral;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function detectIntent(msg) {
    const m = msg.toLowerCase().trim();
    if (m.length <= 3) return "short";
    if (m.includes("?")) return "question";
    if (["lol","😂","😆"].some(e => m.includes(e))) return "joking";
    if (["fuck","fool","stupid","idiot"].some(w => m.includes(w))) return "hostile";
    if (["ok","fine","whatever","sure"].includes(m)) return "dismissive";
    return "neutral";
  }

  function updatePersonality(intent) {
    if (intent === "joking") personality.playful++;
    else if (intent === "hostile") personality.serious++;
    else personality.thoughtful++;
  }
});
