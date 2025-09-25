const button = document.getElementById('messageButton');
const p = document.getElementById('p_text');

window.electronAPI.onMessage((message) =>
{
    p.title = message;
    p.textContent = message;
});

button.addEventListener('click', () =>
{
    window.electronAPI.sendMessage('Button clicked!');
});