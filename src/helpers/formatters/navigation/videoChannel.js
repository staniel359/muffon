import { localize } from '#/actions/plugins/i18n'

export default function ({ channelTitle }) {
  return [
    {
      name: localize(
        'layout.navigation.videoChannels'
      )
    },
    { name: channelTitle },
    {
      name: localize(
        'layout.navigation.videos'
      ),
      isActive: true
    }
  ]
}
