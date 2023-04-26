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
    image
  }
) {
  const currentTime = Date.now()

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
    startTimestamp: currentTime,
    largeImageText: albumTitle,
    smallImageText: appName,
    largeImageKey: image,
    smallImageKey: 'logo',
    buttons
  }

  return discordClient.setActivity(
    activity
  )
}
