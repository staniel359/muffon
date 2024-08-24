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
    image
  } = playingData

  const activity = {
    type: 2,
    details: trackTitle,
    state: artistName,
    assets: {
      large_image: image,
      large_text: albumTitle,
      small_image: 'logo',
      small_text: appName
    },
    ...(buttons.length && {
      buttons
    })
  }

  discordClient.request(
    'SET_ACTIVITY',
    {
      pid: process.pid,
      activity
    }
  )
}
