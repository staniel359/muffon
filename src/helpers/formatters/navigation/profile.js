import { profileMain as formatProfileMainLink } from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const profilesPageName = localize(
    'layout.navigation.profiles'
  )

  const formatLink = () => {
    if (pageNameKey) {
      return formatProfileMainLink({
        profileId
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      const profilePageName = localize(
        `layout.navigation.profile.${pageNameKey}`
      )

      return {
        name: profilePageName,
        isActive: true
      }
    }
  }

  return [
    { name: profilesPageName },
    {
      name: profileNickname,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
