const { ipcRenderer } = require('electron');

document.getElementById('minimize-btn').addEventListener('click', () => {
  ipcRenderer.send('minimize-window');
});

document.getElementById('close-btn').addEventListener('click', () => {
    console.log('rendered got the close')
  ipcRenderer.send('close-window');
});
document.getElementById('focus-btn').addEventListener('click', () => {
  console.log('button pressed')
  ipcRenderer.send('blackout');
});
document.getElementById('blackoutStop').addEventListener('click', () => {
  console.log('button pressed for stopping blackout')
  ipcRenderer.send('close-blackout');
});
