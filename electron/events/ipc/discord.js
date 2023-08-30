import {
  ipcMain
} from 'electron'
import {
  handleConnectDiscord,
  handleSetDiscordActivity,
  handleResetDiscordActivity,
  handleDisconnectDiscord
} from '#/handlers/ipc/discord'

export default function () {
  ipcMain.on(
    'connect-discord',
    handleConnectDiscord
  )

  ipcMain.on(
    'set-discord-activity',
    handleSetDiscordActivity
  )

  ipcMain.on(
    'reset-discord-activity',
    handleResetDiscordActivity
  )

  ipcMain.on(
    'disconnect-discord',
    handleDisconnectDiscord
  )
}
