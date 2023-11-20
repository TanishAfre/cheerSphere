const { app, BrowserWindow } = require('electron')


//I disabled developer mode but to enable it press Ctrl+Shift+I
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    resizable: false, //Disabled Resizing as a UI preference 
    //frame: false, // Set frame to false to remove window frame
    autoHideMenuBar: true, //hide the menu bar and not the frame
    webPreferences: {
      devTools: true
   }
   
  })
  win.setThumbarButtons([])
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

//need to work on this as instead of closing the app it should go in background 
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})