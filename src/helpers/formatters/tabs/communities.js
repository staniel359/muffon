import i18n from '@/plugins/i18n'
import {
  communities as formatCommunitiesLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.communities'
  )

  const link = formatCommunitiesLink()

  return {
    icon: 'community',
    title,
    link,
    path: link.path
  }
}
