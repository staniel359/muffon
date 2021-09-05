import { main as formatProfileMainLink } from '#/formatters/links/profile'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'
import { localize } from '#/actions/plugins/i18n'

export default function ({ profileId, profileNickname, pageNameKey }) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const title = [
    profileNickname,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'library':
        return formatProfileLibraryMainLink({
          profileId
        }).path
      default:
        return formatProfileMainLink({
          profileId
        }).path
    }
  }

  return {
    icon: 'user',
    title,
    path: formatPath()
  }
}
