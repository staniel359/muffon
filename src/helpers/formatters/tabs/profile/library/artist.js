import i18n from '&/i18n'
import {
  main as formatProfileLibraryArtistMainLink,
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '#/formatters/links/profile/library/artist'

export default function ({
  profileId,
  profileNickname,
  artistId,
  artistName,
  pageNameKey
}) {
  const formatProfileLibraryArtistPageTitle = () => {
    if (pageNameKey) {
      return i18n.global.t(
        `layout.navigation.model.${pageNameKey}`,
        { modelName: artistName }
      )
    } else {
      return artistName
    }
  }

  const profileLibraryPageTitle = i18n.global.t(
    'layout.navigation.model.artists',
    { modelName: profileNickname }
  )

  const title = [
    formatProfileLibraryArtistPageTitle(),
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (pageNameKey) {
      case 'albums':
        return formatProfileLibraryArtistAlbumsLink({
          profileId,
          artistId
        }).path
      case 'tracks':
        return formatProfileLibraryArtistTracksLink({
          profileId,
          artistId
        }).path
      default:
        return formatProfileLibraryArtistMainLink({
          profileId,
          artistId
        }).path
    }
  }

  return {
    icon: 'microphone alternate',
    title,
    path: formatPath()
  }
}
