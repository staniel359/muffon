import i18n from '@/plugins/i18n'

export default function (
  {
    isActive
  }
) {
  return {
    name: i18n.global.t(
      'navigation.savedTracks'
    ),
    isActive
  }
}
