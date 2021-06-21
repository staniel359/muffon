import i18n from '#/plugins/i18n'

export const localize = (string, options) => {
  return i18n.global.t(
    string, options
  )
}

export const pluralize = (string, number, options) => {
  return i18n.global.tc(
    string, number, options
  )
}
