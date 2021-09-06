import i18n from '*/i18n'

export const startPage = () => {
  const title = i18n.global.t(
    'layout.navigation.start'
  )

  return {
    title,
    path: 'start'
  }
}
