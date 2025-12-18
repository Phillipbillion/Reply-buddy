const messageInput = document.getElementById("message-input");
const generateBtn = document.getElementById("generate-btn");
const chatList = document.getElementById("chat-list");

// Generate reply
generateBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (!message) return alert("Paste a message first!");

  // Show user message first
  addChatMessage(message, "user-msg");

  // Detect tone automatically
  const tone = detectTone(message);

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

// Buddy reply generator with personality
function generateBuddyReply(message, tone) {
  let replies = [];
  switch(tone) {
    case "playful":
      replies = [
        `Haha! "${message}" 😆`,
        `LOL, just read: "${message}" 😂`,
        `"${message}"? That’s funny! 😎`
      ];
      break;
    case "serious":
      replies = [
        `I understand: "${message}". Let's handle it carefully.`,
        `"${message}" is important. Here's what I think...`,
        `Noted: "${message}". We'll approach this wisely.`
      ];
      break;
    case "thoughtful":
      replies = [
        `"${message}" — I see, let's think it through.`,
        `Thanks for sharing: "${message}". Here's my insight...`,
        `Considering "${message}", I feel we should...`
      ];
      break;
    default:
      replies = [`"${message}"`];
  }

  return replies[Math.floor(Math.random() * replies.length)];
}

// Simple tone detection (Phase 4 MVP)
function detectTone(message) {
  const playfulWords = ["haha","lol","😂","😆","funny","wow"];
  const seriousWords = ["important","please","urgent","asap","careful"];
  
  const msgLower = message.toLowerCase();

  if (playfulWords.some(word => msgLower.includes(word))) return "playful";
  if (seriousWords.some(word => msgLower.includes(word))) return "serious";

  return "thoughtful"; // default mature/friendly tone
} 
