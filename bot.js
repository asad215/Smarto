
window.onload = function () {
    const chatBtn = document.createElement('div');
    chatBtn.innerHTML = `<div id="open-chat" style="position: fixed; bottom: 20px; right: 20px; background: #00ffe1; color: #000; font-weight: bold; padding: 10px; border-radius: 8px; cursor: pointer;">Chat with us</div>`;
    document.body.appendChild(chatBtn);

    document.getElementById('open-chat').onclick = () => {
        chatBtn.remove();

        const widget = document.createElement('div');
        widget.id = 'chat-widget';
        widget.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; width: 340px; background: #111; border: 2px solid #00ffe1; border-radius: 12px; z-index: 9999; padding: 10px;">
                <div style="text-align: right;"><button id="close-chat" style="background: none; color: #00ffe1; border: none; font-size: 18px;">×</button></div>
                <div style="text-align: center;">
                    <img src="james.jpg" alt="James" style="width: 70px; height: 70px; border-radius: 50%; border: 2px solid #00ffe1; margin-bottom: 10px;">
                    <div style="font-weight: bold; color: #00ffe1;">James - AI Assistant</div>
                </div>
                <div id="chat-box" style="margin-top: 10px; background: #000; color: #fff; padding: 10px; border-radius: 5px; max-height: 250px; overflow-y: auto;"></div>
                <input id="chat-input" placeholder="Type your message..." style="width: 75%; padding: 5px;" />
                <button onclick="sendMessage()" style="width: 20%; background: #00ffe1; color: #000; font-weight: bold; border: none; cursor: pointer;">Send</button>
            </div>
        `;
        document.body.appendChild(widget);

        document.getElementById('close-chat').onclick = () => {
            widget.remove();
            document.body.appendChild(chatBtn);
        };

        const input = document.getElementById('chat-input');
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") sendMessage();
        });
    };
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
