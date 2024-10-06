// const { ipcRenderer } = require("electron");
const { contextBridge, ipcRenderer } = require('electron');


process.once("loaded", () => {
  window.ipcRenderer = ipcRenderer;
});

// contextBridge.exposeInMainWorld('batchPreload', {
//   executeBatch: () => ipcRenderer.send('execute-batch'),
//   onBatchOutput: (callback) => ipcRenderer.on('batch-output', (event, output) => callback(output)),
// });
