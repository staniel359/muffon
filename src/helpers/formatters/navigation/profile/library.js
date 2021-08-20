import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'
import { localize } from '#/actions/plugins/i18n'

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
        name: localize(
          `layout.navigation.library.${pageNameKey}`
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
      link: formatProfileMainLink({
        profileId
      })
    },
    {
      name: localize(
        'layout.navigation.profile.library'
      ),
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
