import i18n from '*/plugins/i18n'
import { profiles as formatProfilesLink } from '*/helpers/formatters/links'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'

export default function ({ profileId, profileNickname, scope }) {
  const formatLink = () => {
    if (scope) {
      return formatProfileMainLink({
        profileId
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.profiles'
      ),
      link: formatProfilesLink()
    },
    {
      name: profileNickname,
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
