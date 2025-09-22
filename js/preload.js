const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
});

contextBridge.exposeInMainWorld('electronAPI', {
    onMessage: (callback) => ipcRenderer.on('update-button', (event, message) => callback(message)),
    sendMessage: (message) => ipcRenderer.send('send-to-python', message)
});