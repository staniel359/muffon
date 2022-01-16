import i18n from '&/i18n'
import { main as formatCommunitiesLink } from '#/formatters/links/communities'

export default function () {
  const title = i18n.global.t(
    'navigation.communities'
  )

  const { path } = formatCommunitiesLink()

  return {
    icon: 'users',
    title,
    path
  }
}
