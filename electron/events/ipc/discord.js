import {
  ipcMain
} from 'electron'
import {
  handleConnectDiscord,
  handleSetDiscordActivity,
  handleResetDiscordActivity
} from '#/handlers/ipc/discord'

export default function () {
  ipcMain.handle(
    'connect-discord',
    handleConnectDiscord
  )

  ipcMain.handle(
    'set-discord-activity',
    handleSetDiscordActivity
  )

  ipcMain.handle(
    'reset-discord-activity',
    handleResetDiscordActivity
  )
}
