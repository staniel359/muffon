import {
  appName
} from '../../helpers/utils.js'

export default function (
  {
    playingData,
    buttons,
    startTime,
    isPlaying
  }
) {
  const {
    trackTitle,
    artistName,
    albumTitle,
    image,
    duration
  } = playingData

  const durationComputed = (
    isPlaying ? duration : 0
  )

  const endTime = (
    startTime +
      durationComputed * 1000
  )

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
    }),
    startTimestamp: startTime,
    endTimestamp: endTime
  }

  discordClient
    .user
    .setActivity(
      activity
    )
}
