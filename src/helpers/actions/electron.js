import { ipcRenderer } from 'electron'

export function setTrayTooltip (value) {
  ipcRenderer.invoke('set-tray-tooltip', value)
}
