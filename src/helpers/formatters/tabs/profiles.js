import i18n from '@/plugins/i18n'
import {
  profiles as formatProfilesLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.profiles'
  )

  const {
    path
  } = formatProfilesLink()

  return {
    icon: 'user',
    title,
    path
  }
}
