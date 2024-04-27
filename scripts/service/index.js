const { ipcMain, dialog } = require('electron/main')
const runGenMachineTimeFileTask = require('./gen-machine-time-file-task.cjs')

function service(mainWindow) {
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.on('genMachineTimeFileTask', (event, filePathObj) => {
    runGenMachineTimeFileTask(event, filePathObj, mainWindow)
  })
  // ipcMain.on('genWaferReportFileTask', runGenWaferReportFileTask)
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  })
  if (!canceled) {
    return filePaths[0]
  }
}

module.exports = service