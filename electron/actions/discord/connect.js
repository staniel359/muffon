import {
  Client as DiscordClient
} from 'discord-rpc'
import {
  discordClientId
} from '#/helpers/env'

export default async function () {
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
    return true
  }

  return discordClient.login(
    loginOptions
  ).then(
    handleSuccess
  )
}
