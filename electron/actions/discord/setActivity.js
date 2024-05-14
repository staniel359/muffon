import {
  appName
} from '../../helpers/utils.js'

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
    endTimestamp,
    ...(buttons.length && {
      buttons
    })
  }

  discordClient.setActivity(
    activity
  )
}
