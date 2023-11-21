const { app, BrowserWindow, ipcMain } = require('electron')
const { exec } = require('child_process'); //running python
const path = require('path') //path
//I disabled developer mode but to enable it press Ctrl+Shift+I
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    resizable: false, //Disabled Resizing as a UI preference 
    frame: false, // Set frame to false to remove window frame
    autoHideMenuBar: true, //hide the menu bar and not the frame
    webPreferences: {
      devTools: true, //disable this when packing the application
      nodeIntegration: true, //needed for custom frame
      contextIsolation: false, //needed for IPCRendered, figured after spending 2 hrs of working and half a bottle of whiskey - H
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
   }
   
  })
  win.loadFile('index.html')


  ipcMain.on('minimize-window', () => {
    win.minimize();
  })
  
  ipcMain.on('close-window', () => {
    win.close();
  })

  ipcMain.on('focus', () => {

    exec('python python/start-focus.py', (error, stdout, stderr) => {
      console.log(error,stderr,stdout)
  });
})

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  }); 

  
})
