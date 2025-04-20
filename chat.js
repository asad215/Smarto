async function sendMessage() {
  const input = document.getElementById('userInput');
  const chatBody = document.getElementById('chat-body');
  const userText = input.value.trim();
  if (!userText) return;

  const userDiv = document.createElement('div');
  userDiv.textContent = "You: " + userText;
  chatBody.appendChild(userDiv);

  const botDiv = document.createElement('div');
  botDiv.innerHTML = '<img src="james.png" alt="James" style="width:20px;height:20px;border-radius:50%;"> James: ...';
  chatBody.appendChild(botDiv);

  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = "";

  try {
    const response = await fetch("https://139d-2001-8f8-1427-f427-6d92-67b0-d8b8-1a08.ngrok-free.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    botDiv.innerHTML = '<img src="james.png" alt="James" style="width:20px;height:20px;border-radius:50%;"> James: ' + (data.reply || "No response.");
  } catch (err) {
    botDiv.innerHTML = '<img src="james.png" alt="James" style="width:20px;height:20px;border-radius:50%;"> James: Error connecting to GPT.';
  }
}

function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = function(event) {
    document.getElementById('userInput').value = event.results[0][0].transcript;
    sendMessage();
  };
  recognition.start();
}
