import { localize } from '#/actions/plugins/i18n'

export default function ({ channelTitle }) {
  return [
    {
      name: localize(
        'layout.navigation.videos'
      )
    },
    { name: channelTitle },
    {
      name: localize(
        'layout.navigation.videoChannel.videos'
      ),
      isActive: true
    }
  ]
}
