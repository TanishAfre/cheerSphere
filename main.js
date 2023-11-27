const { app, BrowserWindow, ipcMain, Tray } = require('electron')
const { exec } = require('child_process'); //running python
const path = require('path') //path
const TrayWindow = require('electron-tray-window');

let tray = null; // Tray instance
let win = null; // BrowserWindow instance
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

    // Create the Tray icon
    tray = new Tray(path.join(__dirname, 'images/focus-mind.ico')); // Path to the tray icon
    tray.setToolTip('Focus Mind'); // Tooltip for the tray icon
    tray.on('click', () => {
      // Restore the window when the tray icon is clicked
      if (win.isVisible()) {
        win.hide();
      } else {
        win.show();
      }
    });
  
    // Minimize the window to tray instead of closing
  win.on('minimize', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });


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

  app.on('before-quit', () => {
    app.isQuitting = true;
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  
})
