export default function () {
  function handleSuccess () {
    mainWindow
      .webContents
      .send(
        'discord-disconnected'
      )
  }

  discordClient
    .destroy()
    .then(
      handleSuccess
    )
}
