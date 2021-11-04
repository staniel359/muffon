import i18n from '*/i18n'
import {
  main as formatProfileLibraryMainLink,
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink
} from '#/formatters/links/profile/library'

export default function ({
  profileId,
  profileNickname,
  pageNameKey
}) {
  const formatTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.model.${pageNameKey}`,
        { modelName: profileNickname }
      )
    } else {
      return profileNickname
    }
  }

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
    title: formatTitle(),
    path: formatPath()
  }
}
