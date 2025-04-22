
window.onload = function () {
    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; background: #00ffe1; padding: 10px; border-radius: 10px; width: 300px; box-shadow: 0 0 10px #00ffe1;">
            <strong>James - AI Assistant</strong>
            <div id="chat-box" style="margin-top: 10px; background: #111; color: #fff; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto;"></div>
            <input id="chat-input" placeholder="Type your message..." style="width: 80%;" />
            <button onclick="sendMessage()">Send</button>
        </div>
    `;
    document.body.appendChild(chatWidget);
};

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    input.value = '';

    try {
        const res = await fetch('https://james-chatbot-2.onrender.com/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message })
        });
        const data = await res.json();
        chatBox.innerHTML += `<div><strong>James:</strong> ${data.reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch {
        chatBox.innerHTML += `<div><strong>James:</strong> Sorry, I can't respond right now.</div>`;
    }
}
