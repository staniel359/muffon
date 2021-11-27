import i18n from '&/i18n'
import { profiles as formatProfilesLink } from '#/formatters/links'
import { main as formatProfileMainLink } from '#/formatters/links/profile'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileMainLink({
        profileId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'layout.navigation.profiles'
      ),
      link: formatProfilesLink()
    },
    {
      name: profileNickname,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
