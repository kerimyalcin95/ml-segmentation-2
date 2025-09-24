const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { spawn } = require('node:child_process');
const WebSocket = require('ws');

let ws;
const pythonPath = app.isPackaged ? 
    path.join(__dirname, '..', '..', 'app.asar.unpacked', 'python', 'server.py') : 
    path.join(__dirname, '..', 'python', 'server.py');

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

    /* vanilla-frontend */
    win.loadFile(path.join(__dirname, '..', 'vanilla-frontend', 'html', 'index.html'));
    
    /* svelte-frontend */
    //win.loadFile(path.join(__dirname, '..', 'html', '../', 'svelte-frontend', 'dist', 'index.html'));
    
};

function connectToPythonServer()
{
    ws = new WebSocket('ws://localhost:8765');
    ws.on('open', () =>
    {
        console.log('Connected to Python server');
        ws.send('Hello from Electron main process!');
    });

    ws.on('message', (data) =>
    {
        console.log(`Received from Python: ${data}`);

        const win = BrowserWindow.getAllWindows()[0];
        if (win && !win.webContents.isLoading()) {
            win.webContents.send('update-button', data.toString());
        }
    });

    ws.on('close', () => console.log('Connection closed'));
    ws.on('error', (err) => console.error('WebSocket error:', err));
}

function startPythonServer()
{
    pythonProc = spawn('python', ['-u', pythonPath]);
    console.log(process.resourcesPath);

    pythonProc.stdout.on('data', (data) => console.log(`Py: ${data}`));
    pythonProc.stderr.on('data', (data) => console.error(`PyErr: ${data}`));
}

function stopPythonServer()
{
    if (ws) ws.close();
    if (pythonProc) pythonProc.kill();
}

ipcMain.on('send-to-python', (event, message) =>
{
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    } else {
        console.error('WebSocket not connected');
    }
});

app.whenReady().then(() =>
{
    createWindow();
    startPythonServer();

    setTimeout(connectToPythonServer, 1000);

    app.on('activate', () =>
    {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    console.log(pythonPath.toString());
});

app.on('window-all-closed', () =>
{
    stopPythonServer();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});