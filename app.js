document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const generateBtn = document.getElementById("generate-btn");
  const chatList = document.getElementById("chat-list");

  // Session memory
  const sessionMemory = [];

  generateBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (!message) return alert("Paste a message first!");

    addChatMessage(message, "user-msg");
    sessionMemory.push({ sender: "user", text: message });

    const tone = detectTone(message);
    const reply = generateBuddyReply(message, tone);
    addChatMessage(reply, "buddy-msg");
    sessionMemory.push({ sender: "buddy", text: reply });

    messageInput.value = "";
  });

  function addChatMessage(msg, className) {
    const li = document.createElement("li");
    li.classList.add("chat-item", className);

    const textSpan = document.createElement("span");
    textSpan.textContent = msg;
    li.appendChild(textSpan);

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

  function generateBuddyReply(message, tone) {
    const baseReplies = {
      playful: [
        `Haha! "${message}" 😆`,
        `LOL, just read: "${message}" 😂`,
        `"${message}"? That’s funny! 😎`
      ],
      serious: [
        `I understand: "${message}". Let's handle it carefully.`,
        `"${message}" is important. Here's what I think...`,
        `Noted: "${message}". We'll approach this wisely.`
      ],
      thoughtful: [
        `"${message}" — I see, let's think it through.`,
        `Thanks for sharing: "${message}". Here's my insight...`,
        `Considering "${message}", I feel we should...`
      ]
    };

    // Default fallback
    const replies = baseReplies[tone] || [`"${message}"`];

    // Random selection
    return replies[Math.floor(Math.random() * replies.length)];
  }

  function detectTone(message) {
    const playfulWords = ["haha","lol","😂","😆","funny","wow","heh","yolo"];
    const seriousWords = ["important","please","urgent","asap","careful","serious","need"];

    const msgLower = message.toLowerCase();
    if (playfulWords.some(word => msgLower.includes(word))) return "playful";
    if (seriousWords.some(word => msgLower.includes(word))) return "serious";

    return "thoughtful"; // default tone
  }
});
