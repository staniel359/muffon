import i18n from '*/plugins/i18n'
import {
  home as formatHomeLink
} from '*/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.home'
  )

  const {
    path
  } = formatHomeLink()

  return {
    icon: 'home',
    title,
    path
  }
}
