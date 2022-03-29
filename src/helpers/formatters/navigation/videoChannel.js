import i18n from '*/plugins/i18n'

export default function ({ channelTitle }) {
  return [
    {
      name: i18n.global.t(
        'navigation.videoChannels'
      )
    },
    { name: channelTitle },
    {
      name: i18n.global.t(
        'navigation.videos'
      ),
      isActive: true
    }
  ]
}
