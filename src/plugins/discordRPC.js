import {
  Client
} from 'discord-rpc'

export let client

export function login () {
  const clientOptions = {
    transport: 'ipc'
  }

  client = new Client(
    clientOptions
  )

  const clientId =
    process.env.VUE_APP_DISCORD_CLIENT_ID

  const loginOptions = {
    clientId
  }

  return client.login(
    loginOptions
  )
}
