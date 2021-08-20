import { main as formatProfileMainLink } from '#/formatters/links/profile'
import { localize } from '#/actions/plugins/i18n'

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
        name: localize(
          `layout.navigation.profile.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.profiles'
      )
    },
    {
      name: profileNickname,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
