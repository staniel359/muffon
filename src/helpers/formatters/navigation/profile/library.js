import i18n from '&/i18n'
import { profiles as formatProfilesLink } from '#/formatters/links'
import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileLibraryMainLink({
        profileId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.${pageNameKey}`
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
        'navigation.library'
      ),
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
