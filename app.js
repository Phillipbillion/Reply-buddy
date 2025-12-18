let responsesDB = [];
let memory = []; // Keep last 5 messages for context

// Load responses.json
fetch('responses.json')
  .then(res => res.json())
  .then(data => { responsesDB = data; });

// DOM elements
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, 'user-msg');
  userInput.value = '';

  const reply = generateReply(text);
  addMessage(reply, 'buddy-msg');
});

function addMessage(text, className) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${className}`;
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Save memory
  if(className === 'user-msg') {
    memory.push(text);
    if(memory.length > 5) memory.shift();
  }
}

// Simple keyword-based reply + random selection
function generateReply(inputText) {
  inputText = inputText.toLowerCase();
  let possibleReplies = [];

  responsesDB.forEach(entry => {
    entry.keywords.forEach(keyword => {
      if(inputText.includes(keyword)) {
        possibleReplies.push(...entry.responses);
      }
    });
  });

  if(possibleReplies.length === 0) {
    // fallback
    possibleReplies = ["Hmm 🤔","Tell me more 😏","Interesting..."];
  }

  // Add slight context awareness (optional)
  if(memory.length > 1 && memory[memory.length-2].includes("bored")) {
    possibleReplies.push("Still bored? Let’s spice things up 😎");
  }

  // Random pick
  return possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
}
