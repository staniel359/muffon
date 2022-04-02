import i18n from '*/plugins/i18n'
import {
  albums as formatArtistAlbumsLink
} from '*/helpers/formatters/links/artist'

export default function ({ artistName }) {
  return {
    name: i18n.global.t(
      'navigation.albums'
    ),
    link: formatArtistAlbumsLink({
      artistName
    })
  }
}
