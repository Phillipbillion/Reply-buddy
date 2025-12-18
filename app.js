const messageInput = document.getElementById("message-input");
const toneSelect = document.getElementById("tone-select");
const generateBtn = document.getElementById("generate-btn");
const suggestionsList = document.getElementById("suggestions-list");

// Load saved replies (optional)
let pastReplies = JSON.parse(localStorage.getItem("pastReplies")) || [];

generateBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();
  const tone = toneSelect.value;

  if (!message) return alert("Please paste a message first!");

  // Generate 3 replies
  const replies = generateReplies(message, tone);

  // Clear previous suggestions
  suggestionsList.innerHTML = "";

  // Display suggestions
  replies.forEach(reply => {
    const li = document.createElement("li");
    li.textContent = reply;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.classList.add("copy-btn");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(reply);
      alert("Copied to clipboard!");
    });

    li.appendChild(copyBtn);
    suggestionsList.appendChild(li);
  });

  // Save last replies locally
  pastReplies = replies;
  localStorage.setItem("pastReplies", JSON.stringify(pastReplies));
});

// Simple reply generator (can later integrate GPT API)
function generateReplies(message, tone) {
  let replies = [];
  switch(tone) {
    case "friendly":
      replies = [
        `Hey! Thanks for your message: "${message}" 🙂`,
        `Got it! I really appreciate it: "${message}" 😄`,
        `Hi! Just saw your message: "${message}" 😎`
      ];
      break;
    case "professional":
      replies = [
        `Thank you for your message: "${message}". I will review and get back to you.`,
        `I acknowledge receipt of: "${message}". I will respond shortly.`,
        `Appreciate your message: "${message}". I will follow up soon.`
      ];
      break;
    case "persuasive":
      replies = [
        `I see your point regarding: "${message}". Here's why we should proceed...`,
        `Considering: "${message}", I strongly recommend we...`,
        `After reviewing "${message}", it would be beneficial to...`
      ];
      break;
    case "funny":
      replies = [
        `Haha! I read: "${message}" 😂`,
        `LOL, "${message}" made me chuckle! 😆`,
        `"${message}"? Classic! 😎`
      ];
      break;
    case "calm":
      replies = [
        `I understand: "${message}". No worries.`,
        `Got it. "${message}"`,
        `"${message}" — everything is fine, let's proceed calmly.`
      ];
      break;
    default:
      replies = [`${message}`];
  }

  return replies;
        }
