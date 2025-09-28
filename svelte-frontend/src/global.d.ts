type ElectronAPI = {
    onMessage: (callback: (message: string) => void) => void;
    sendMessage: (message: string) => void;
};

interface Window
{
    versions: {
        node: () => string;
        chrome: () => string;
        electron: () => string;
    };
    electronAPI: ElectronAPI;
}