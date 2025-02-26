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
    largeImageKey: image,
    ...(albumTitle && {
      largeImageText: albumTitle
    }),
    smallImageKey: 'logo',
    smallImageText: appName,
    ...(buttons.length && {
      buttons
    })
  }

  discordClient
    .user
    .setActivity(
      activity
    )
}
