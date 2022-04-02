import i18n from '*/plugins/i18n'
import {
  main as formatProfileLibraryArtistMainLink,
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink
} from '*/helpers/formatters/links/profile/library/artist'

export default function ({
  profileId,
  profileNickname,
  artistId,
  artistName,
  scope
}) {
  const formatProfileLibraryArtistPageTitle = () => {
    if (scope) {
      return i18n.global.t(
        `navigation.model.${scope}`,
        { modelName: artistName }
      )
    } else {
      return artistName
    }
  }

  const profileLibraryPageTitle = i18n.global.t(
    'navigation.model.artists',
    { modelName: profileNickname }
  )

  const title = [
    formatProfileLibraryArtistPageTitle(),
    profileLibraryPageTitle
  ].join(' | ')

  const formatPath = () => {
    switch (scope) {
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
