document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const generateBtn = document.getElementById("generate-btn");
  const chatList = document.getElementById("chat-list");

  // Load memory
  const sessionMemory = JSON.parse(localStorage.getItem("sessionMemory")) || [];
  const personality = JSON.parse(localStorage.getItem("buddyPersonality")) || { playfulScore: 0, seriousScore: 0, thoughtfulScore: 0 };

  // Render previous messages
  sessionMemory.forEach(item => addChatMessage(item.text, item.sender === "user" ? "user-msg" : "buddy-msg"));

  generateBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (!message) return alert("Paste a message first!");

    addChatMessage(message, "user-msg");
    sessionMemory.push({ sender: "user", text: message });

    const tone = detectTone(message);
    updatePersonality(tone);

    const reply = generateAdaptiveReply(message);
    addChatMessage(reply, "buddy-msg");
    sessionMemory.push({ sender: "buddy", text: reply });

    // Save memory
    localStorage.setItem("sessionMemory", JSON.stringify(sessionMemory));
    localStorage.setItem("buddyPersonality", JSON.stringify(personality));

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

  function generateAdaptiveReply(message) {
    // Weight personality to choose tone
    let chosenTone = "thoughtful"; // default
    const maxScore = Math.max(personality.playfulScore, personality.seriousScore, personality.thoughtfulScore);
    if (maxScore === personality.playfulScore) chosenTone = "playful";
    else if (maxScore === personality.seriousScore) chosenTone = "serious";

    // Replies database
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

    const replies = baseReplies[chosenTone] || [`"${message}"`];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  function detectTone(message) {
    const playfulWords = ["haha","lol","😂","😆","funny","wow","heh","yolo"];
    const seriousWords = ["important","please","urgent","asap","careful","serious","need"];

    const msgLower = message.toLowerCase();
    if (playfulWords.some(word => msgLower.includes(word))) return "playful";
    if (seriousWords.some(word => msgLower.includes(word))) return "serious";

    return "thoughtful"; // default
  }

  function updatePersonality(tone) {
    switch(tone){
      case "playful": personality.playfulScore++; break;
      case "serious": personality.seriousScore++; break;
      case "thoughtful": personality.thoughtfulScore++; break;
    }
  }
});
