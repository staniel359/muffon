import connectDiscord from '#/actions/discord/connect'
import setDiscordActivity from '#/actions/discord/setActivity'
import resetDiscordActivity from '#/actions/discord/resetActivity'

export function handleConnectDiscord () {
  return connectDiscord()
}

export function handleSetDiscordActivity (
  _,
  data
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  return setDiscordActivity(
    dataFormatted
  )
}

export function handleResetDiscordActivity () {
  return resetDiscordActivity()
}
