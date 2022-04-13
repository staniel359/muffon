import i18n from '*/plugins/i18n'

export default function (
  {
    scope
  }
) {
  return {
    name: i18n.global.t(
      `navigation.${scope}`
    ),
    isActive: true
  }
}
