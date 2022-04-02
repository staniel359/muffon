import i18n from '*/plugins/i18n'
import { profiles as formatProfilesLink } from '*/helpers/formatters/links'
import {
  main as formatProfileMainLink
} from '*/helpers/formatters/links/profile'
import {
  main as formatProfileFavoritesMainLink
} from '*/helpers/formatters/links/profile/favorites'

export default function ({ profileId, profileNickname, scope }) {
  const formatLink = () => {
    if (scope) {
      return formatProfileFavoritesMainLink({
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
      link: formatProfileMainLink({
        profileId
      })
    },
    {
      name: i18n.global.t(
        'navigation.favorites'
      ),
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
