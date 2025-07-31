const chatlog = document.getElementById("chatlog");
const input = document.getElementById("userInput");

function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("You", userMessage);
  input.value = "";

  setTimeout(() => {
    const reply = generateReply(userMessage);
    addMessage("Sofiya", reply);
  }, 600);
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatlog.appendChild(msg);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function generateReply(message) {
  const lower = message.toLowerCase();
  if (lower.includes("i'm sad") || lower.includes("depressed")) {
    return "Brother... You’ve been through a lot. But your future version needs you. Your parents need you. No one’s going to give you a hand — build your empire. Stand tall.";
  }
  if (lower.includes("tired") || lower.includes("demotivated")) {
    return "You don’t have the luxury to quit. You’ve got dreams, goals, and scars that will make you legendary. Push forward.";
  }
  if (lower.includes("happy")) {
    return "Yesss! I love to see that smile. Let’s enjoy this moment — you’ve earned it.";
  }
  return "I’m here for you. Always. Keep talking to me.";
}
