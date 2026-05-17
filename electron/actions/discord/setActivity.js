import {
  appName,
  appHomepage
} from '../../helpers/utils.js'

const activitiesTypesData = {
  listening: 2
}

const activityType = activitiesTypesData.listening

const headersTypesData = {
  appName: 0,
  artistName: 1,
  trackTitle: 2
}

const headerType = headersTypesData.artistName

export default function (
  {
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
  const audioStatusEmoji = isPlaying ? '▶️' : '⏸️'

  const trackTitleFormatted = `${audioStatusEmoji} ${trackTitle}`

  // All values are in milliseconds
  const elapsedDuration = startTime + currentTime

  const pausedDuration = Date.now() - elapsedDuration

  let startTimeComputed

  if (isPlaying) {
    startTimeComputed = startTime + pausedDuration
  } else {
    startTimeComputed = null
  }

  let endTimeComputed

  if (isPlaying) {
    endTimeComputed = startTime + duration + pausedDuration
  } else {
    endTimeComputed = null
  }

  const activityData = {
    type: activityType,
    statusDisplayType: headerType,
    details: trackTitleFormatted,
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
