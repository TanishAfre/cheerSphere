const { ipcRenderer } = require('electron');

document.getElementById('minimize-btn').addEventListener('click', () => {
  ipcRenderer.send('minimize-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
  ipcRenderer.send('close-window');
});
