import i18n from '@/plugins/i18n'
import {
  tracks as formatProfileLibraryArtistTracksLink
} from '@/helpers/formatters/links/profile/library/artist'

export default function (
  {
    profileId,
    libraryArtistId
  }
) {
  return {
    name: i18n.global.t(
      'navigation.tracks'
    ),
    link: formatProfileLibraryArtistTracksLink(
      {
        profileId,
        libraryArtistId
      }
    )
  }
}
