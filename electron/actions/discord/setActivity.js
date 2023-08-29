import {
  appName
} from '#/helpers/utils'

export default function (
  {
    playingData,
    buttons
  }
) {
  const {
    trackTitle,
    artistName,
    albumTitle,
    image,
    duration
  } = playingData

  const startTimestamp = Date.now()

  const endTimestamp = (
    startTimestamp +
      duration * 1000
  )

  const activity = {
    details: trackTitle,
    state: artistName,
    largeImageText: albumTitle,
    smallImageText: appName,
    largeImageKey: image,
    smallImageKey: 'logo',
    startTimestamp,
    endTimestamp,
    ...(buttons.length && {
      buttons
    })
  }

  return discordClient.setActivity(
    activity
  )
}
