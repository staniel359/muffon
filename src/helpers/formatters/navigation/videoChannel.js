import { localize } from '#/actions/plugins/i18n'

export default function ({ channelTitle }) {
  const videosPageName = localize(
    'layout.navigation.videos'
  )

  const channelVideosPageName = localize(
    'layout.navigation.video.channel.videos'
  )

  return [
    { name: videosPageName },
    { name: channelTitle },
    { name: channelVideosPageName }
  ]
}
