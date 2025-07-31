const chatlog = document.getElementById("chatlog");
const input = document.getElementById("userInput");

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("You", userMessage);
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "guest",         // You can later replace this with a real user ID if needed
        input: userMessage,
      }),
    });

    const data = await res.json();

    if (res.ok && data.reply) {
      addMessage("Sofiya", data.reply);
    } else {
      addMessage("Sofiya", "Hmm... I'm not sure what to say.");
    }
  } catch (error) {
    console.error("Error:", error);
    addMessage("Sofiya", "Something went wrong while talking to me...");
  }
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatlog.appendChild(msg);
  chatlog.scrollTop = chatlog.scrollHeight;
}
