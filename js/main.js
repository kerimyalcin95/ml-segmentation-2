const { app, BrowserWindow } = require('electron');
const path = require('node:path')


const createWindow = () =>
{
    if (require('electron-squirrel-startup')) app.quit();

    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, '..', 'html', 'index.html'));
};

app.whenReady().then(() =>
{
    createWindow();

    app.on('activate', () =>
    {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin') {
        app.quit();
    }
});