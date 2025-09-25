import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import path from 'node:path';
import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process';
import WebSocket from 'ws';

let ws: WebSocket | undefined;
let pythonProc: ChildProcessWithoutNullStreams | undefined;

const pythonPath: string = app.isPackaged
    ? path.join(__dirname, '..', '..', 'app.asar.unpacked', 'python', 'server.py')
    : path.join(__dirname, '..', 'python', 'server.py');

const createWindow = (): void => {
    if (require('electron-squirrel-startup')) {
        app.quit();
        return;
    }

    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Load vanilla-frontend
    win.loadFile(path.join(__dirname, '..', 'vanilla-frontend', 'html', 'index.html'));

    // Load Svelte frontend
    // win.loadFile(path.join(__dirname, '..', 'html', '../', 'svelte-frontend', 'dist', 'index.html'));
};

const connectToPythonServer = (): void => {
    ws = new WebSocket('ws://localhost:8765');

    ws.on('open', () => {
        console.log('Connected to Python server');
        ws?.send('Hello from Electron main process!');
    });

    ws.on('message', (data) => {
        console.log(`Received from Python: ${data}`);
        const win = BrowserWindow.getAllWindows()[0];
        if (win && !win.webContents.isLoading()) {
            win.webContents.send('update-button', data.toString());
        }
    });

    ws.on('close', () => console.log('Connection closed'));
    ws.on('error', (err) => console.error('WebSocket error:', err));
};

const startPythonServer = (): void => {
    pythonProc = spawn('python', ['-u', pythonPath]);
    console.log(process.resourcesPath);

    pythonProc.stdout.on('data', (data) => console.log(`Py: ${data}`));
    pythonProc.stderr.on('data', (data) => console.error(`PyErr: ${data}`));
};

const stopPythonServer = (): void => {
    ws?.close();
    pythonProc?.kill();
};

ipcMain.on('send-to-python', (event: IpcMainEvent, message: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(message);
    } else {
        console.error('WebSocket not connected');
    }
});

app.whenReady().then(() => {
    createWindow();
    startPythonServer();

    setTimeout(connectToPythonServer, 1000);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    console.log(pythonPath.toString());
});

app.on('window-all-closed', () => {
    stopPythonServer();
    if (process.platform !== 'darwin') app.quit();
});
