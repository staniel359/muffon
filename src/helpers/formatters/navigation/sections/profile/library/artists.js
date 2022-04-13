import i18n from '*/plugins/i18n'
import {
  artists as formatProfileLibraryArtistsLink
} from '*/helpers/formatters/links/profile/library'

export default function (
  {
    profileId
  }
) {
  return {
    name: i18n.global.t(
      'navigation.artists'
    ),
    link: formatProfileLibraryArtistsLink(
      {
        profileId
      }
    )
  }
}
