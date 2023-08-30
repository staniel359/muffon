import connectDiscord from '#/actions/discord/connect'
import setDiscordActivity from '#/actions/discord/setActivity'
import resetDiscordActivity from '#/actions/discord/resetActivity'
import disconnectDiscord from '#/actions/discord/disconnect'

export function handleConnectDiscord () {
  connectDiscord()
}

export function handleSetDiscordActivity (
  _,
  data
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  setDiscordActivity(
    dataFormatted
  )
}

export function handleResetDiscordActivity () {
  resetDiscordActivity()
}

export function handleDisconnectDiscord () {
  disconnectDiscord()
}
