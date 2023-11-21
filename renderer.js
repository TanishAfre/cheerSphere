const { ipcRenderer } = require('electron');
console.log('Renderer process: Script loaded');

document.getElementById('minimize-btn').addEventListener('click', () => {
  ipcRenderer.send('minimize-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
    console.log('rendered got the close')
  ipcRenderer.send('close-window');
});
