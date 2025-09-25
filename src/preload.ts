import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('versions', {
    node: (): string => process.versions.node,
    chrome: (): string => process.versions.chrome,
    electron: (): string => process.versions.electron,
});

type ElectronAPI = {
    onMessage: (callback: (message: string) => void) => void;
    sendMessage: (message: string) => void;
};

contextBridge.exposeInMainWorld('electronAPI', {
    onMessage: (callback: (message: string) => void) => {
        ipcRenderer.on('update-button', (_event: IpcRendererEvent, message: string) => {
            callback(message);
        });
    },
    sendMessage: (message: string) => {
        ipcRenderer.send('send-to-python', message);
    },
} as ElectronAPI);

declare global {
    interface Window {
        versions: {
            node: () => string;
            chrome: () => string;
            electron: () => string;
        };
        electronAPI: ElectronAPI;
    }
}