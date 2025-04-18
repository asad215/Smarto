
// Simple embedded bot logic (iframe example)
window.onload = () => {
  const bot = document.createElement('div');
  bot.innerHTML = '<iframe src="https://example.com/asad-bot" width="350" height="500" style="border:none;"></iframe>';
  bot.style.position = 'fixed';
  bot.style.bottom = '20px';
  bot.style.right = '20px';
  bot.style.zIndex = '9999';
  document.body.appendChild(bot);
};
