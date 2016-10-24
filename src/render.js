const {app, BrowserWindow, protocol} = require('electron');
const path = require('path');
console.log(path.join(__dirname, '..', 'public'));
require('electron-reload')(path.join(__dirname, '..', 'public'));

let win;

function createWindow () {

  win = new BrowserWindow();

  win.loadURL(`file://${path.join(__dirname, '..', 'public')}/index.html`);
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});