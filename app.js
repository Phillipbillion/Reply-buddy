const messageInput = document.getElementById("message-input");
const toneSelect = document.getElementById("tone-select");
const generateBtn = document.getElementById("generate-btn");
const chatList = document.getElementById("chat-list");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const body = document.body;

// Load last selected tone
const savedTone = localStorage.getItem("lastTone");
if (savedTone) toneSelect.value = savedTone;

// Theme toggle
themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  themeToggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Generate reply
generateBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  const tone = toneSelect.value;

  if (!message) return alert("Paste a message first!");

  localStorage.setItem("lastTone", tone);

  // Show user message first
  addChatMessage(message, "user-msg");

  // Generate Buddy reply
  const reply = generateBuddyReply(message, tone);
  addChatMessage(reply, "buddy-msg");

  // Clear input
  messageInput.value = "";
});

// Add chat message to list
function addChatMessage(msg, className) {
  const li = document.createElement("li");
  li.textContent = msg;
  li.classList.add("chat-item", className);

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy";
  copyBtn.classList.add("copy-btn");
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(msg);
    alert("Copied to clipboard!");
  });

  li.appendChild(copyBtn);
  chatList.appendChild(li);
  chatList.scrollTop = chatList.scrollHeight;
}

// Buddy reply generator (Phase 3 personality)
function generateBuddyReply(message, tone) {
  let replies = [];
  switch(tone) {
    case "friendly":
      replies = [
        `Hey! I read your message: "${message}" 🙂`,
        `Got it! "${message}" sounds interesting 😄`,
        `Hi there! Just saw: "${message}" 😎`
      ];
      break;
    case "professional":
      replies = [
        `Thank you for your message: "${message}". I will review.`,
        `Acknowledged: "${message}". I’ll respond shortly.`,
        `"${message}" has been noted.`
      ];
      break;
    case "persuasive":
      replies = [
        `Considering "${message}", I strongly suggest we proceed...`,
        `Based on "${message}", it would be best to...`,
        `"${message}" gives us a good reason to...`
      ];
      break;
    case "funny":
      replies = [
        `Haha! "${message}" made me laugh 😂`,
        `"${message}"? Classic! 😆`,
        `LOL, just read: "${message}" 😎`
      ];
      break;
    case "calm":
      replies = [
        `I understand: "${message}". No worries.`,
        `"${message}" — everything is fine, let's proceed calmly.`,
        `Got it. "${message}"`
      ];
      break;
    default:
      replies = [`${message}`];
  }

  // Randomly pick one to feel natural
  return replies[Math.floor(Math.random() * replies.length)];
}
