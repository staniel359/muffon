import {
  appName,
  appHomepage
} from '../../helpers/utils.js'

const activitiesTypes = {
  playing: 0,
  streaming: 1,
  listening: 2,
  watching: 3,
  custom: 4,
  competing: 5
}

const headersTypes = {
  appName: 0,
  artistName: 1,
  trackTitle: 2
}

export default function (
  {
    activityType = 'listening',
    headerType = 'artistName',
    trackTitle,
    trackLink,
    artistName,
    artistLink,
    albumTitle,
    albumLink,
    image,
    startTime,
    currentTime,
    duration,
    buttons,
    isPlaying
  }
) {
  const pausedDuration = (
    Date.now() -
      startTime -
      currentTime * 1000
  )

  let startTimeComputed

  if (isPlaying) {
    startTimeComputed = (
      startTime + pausedDuration
    )
  } else {
    startTimeComputed = 1
  }

  const endTime = (
    startTime +
      duration * 1000
  )

  let endTimeComputed

  if (isPlaying) {
    endTimeComputed = (
      endTime + pausedDuration
    )
  } else {
    endTimeComputed = 1
  }

  const activityData = {
    type:
      activitiesTypes[activityType],
    statusDisplayType:
      headersTypes[headerType],
    details: trackTitle,
    detailsUrl: trackLink,
    state: artistName,
    stateUrl: artistLink,
    largeImageKey: image,
    largeImageText: albumTitle,
    largeImageUrl: albumLink,
    smallImageKey: 'logo',
    smallImageText: appName,
    buttons,
    smallImageUrl: appHomepage,
    startTimestamp: startTimeComputed,
    endTimestamp: endTimeComputed
  }

  discordClient
    .user
    .setActivity(
      activityData
    )
}
