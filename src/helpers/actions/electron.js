const { ipcRenderer } = require('electron')

export function setTrayTooltip (value) {
  ipcRenderer.invoke('set-tray-tooltip', value)
}
