import {
  appName
} from '#/helpers/utils'
import {
  homepageUrl
} from '#/helpers/urls'

export default function (
  {
    trackTitle,
    artistName,
    albumTitle,
    image,
    duration
  }
) {
  const startTimestamp = Date.now()

  const endTimestamp = (
    startTimestamp +
      duration * 1000
  )

  const downloadButtonData = {
    label: appName,
    url: homepageUrl
  }

  const buttons = [
    downloadButtonData
  ]

  const activity = {
    details: trackTitle,
    state: artistName,
    largeImageText: albumTitle,
    smallImageText: appName,
    largeImageKey: image,
    smallImageKey: 'logo',
    startTimestamp,
    endTimestamp,
    buttons
  }

  return discordClient.setActivity(
    activity
  )
}
