export default function () {
  function handleSuccess () {
    mainView
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
