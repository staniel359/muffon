import {
  Client
} from 'discord-rpc'
import {
  discordClientId
} from '@/helpers/data/env'

export let client

export function login () {
  const clientOptions = {
    transport: 'ipc'
  }

  client = new Client(
    clientOptions
  )

  const loginOptions = {
    clientId: discordClientId
  }

  return client.login(
    loginOptions
  )
}
