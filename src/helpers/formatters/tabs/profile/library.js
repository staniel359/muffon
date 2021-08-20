import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink
} from '#/formatters/links/profile/library'
import { localize } from '#/actions/plugins/i18n'

export default function ({
  profileId,
  profileNickname,
  pageNameKey
}) {
  const formatSubpageTitle = () => {
    if (pageNameKey) {
      return localize(
        `layout.navigation.library.${pageNameKey}`
      ).toLowerCase()
    }
  }

  const title = [
    profileNickname,
    formatSubpageTitle()
  ].filter(e => e).join(' ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'artists':
        return formatProfileLibraryArtistsLink({
          profileId
        }).path
      case 'albums':
        return formatProfileLibraryAlbumsLink({
          profileId
        }).path
      case 'tracks':
        return formatProfileLibraryTracksLink({
          profileId
        }).path
      default:
        return formatProfileLibraryMainLink({
          profileId
        }).path
    }
  }

  return {
    icon: 'headphones',
    title,
    path: formatPath()
  }
}
