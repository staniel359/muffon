import {
  Client as DiscordClient
} from '@xhayper/discord-rpc'
import {
  discordClientId
} from '../../helpers/env.js'

export default function () {
  const options = {
    clientId: discordClientId
  }

  discordClient =
    new DiscordClient(
      options
    )

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

  discordClient
    .login()
    .then(
      handleSuccess
    ).catch(
      handleError
    )
}
