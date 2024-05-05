import connectDiscord from '../../actions/discord/connect.js'
import setDiscordActivity from '../../actions/discord/setActivity.js'
import resetDiscordActivity from '../../actions/discord/resetActivity.js'
import disconnectDiscord from '../../actions/discord/disconnect.js'

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
