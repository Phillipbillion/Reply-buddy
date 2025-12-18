// ====== Reply Buddy Offline-Hybrid AI ======

// DOM elements
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatList = document.getElementById("chat-list");

// Pre-written known replies
const knownReplies = {
  "hi": "Hey! How's it going? 🙂",
  "hello": "Hello there! 😎",
  "how are you": "I'm Buddy! Feeling chatty 😏 How about you?",
  "good morning": "Good morning! Ready to tackle the day? 🌞",
  "good night": "Night! Sleep tight 😴",
  "lol": "Haha 😂 You're funny!"
};

// Personality templates
const personalities = ["serious", "playful", "sassy", "thoughtful"];

function generateOpinion(input) {
  const personality = personalities[Math.floor(Math.random() * personalities.length)];
  switch(personality) {
    case "serious":
      return `Hmm 🤔 based on my thinking, I’d say "${input}" is pretty interesting.`;
    case "playful":
      return `Haha 😆 I’d totally go with "${input}" just for fun!`;
    case "sassy":
      return `Oh really? 😏 "${input}" seems too easy to beat, my friend.`;
    case "thoughtful":
      return `Let me think… 🧐 "${input}" could go either way, honestly.`;
  }
}

// Handle user message
function handleMessage(input) {
  const lowerInput = input.toLowerCase().trim();
  
  if (knownReplies[lowerInput]) {
    return knownReplies[lowerInput];
  } else {
    // Offline: generate Buddy's own opinion
    return generateOpinion(input);
  }
}

// Add message to chat
function addMessage(sender, text) {
  const li = document.createElement("li");
  li.className = sender;
  li.textContent = text;
  chatList.appendChild(li);
  chatList.scrollTop = chatList.scrollHeight; // Auto-scroll
}

// Send button
sendBtn.addEventListener("click", () => {
  const input = messageInput.value.trim();
  if (!input) return;

  addMessage("user", input);
  const reply = handleMessage(input);
  addMessage("buddy", reply);

  messageInput.value = "";
});

// Allow pressing Enter to send
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});
