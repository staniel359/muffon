import {
  Client as DiscordClient
} from 'discord-rpc'
import {
  discordClientId
} from '../../helpers/env.js'

export default function () {
  const options = {
    transport: 'ipc'
  }

  discordClient =
    new DiscordClient(
      options
    )

  const loginOptions = {
    clientId: discordClientId
  }

  function handleSuccess () {
    mainView
      .webContents
      .send(
        'discord-connected'
      )
  }

  function handleError (
    error
  ) {
    const isClientNotRunning = (
      error.message ===
        'Could not connect'
    )

    if (!isClientNotRunning) {
      console.log(
        error.message
      )
    }
  }

  discordClient.login(
    loginOptions
  ).then(
    handleSuccess
  ).catch(
    handleError
  )
}
