import i18n from '*/plugins/i18n'
import {
  tracks as formatArtistTracksLink
} from '*/helpers/formatters/links/artist'

export default function ({ artistName }) {
  return {
    name: i18n.global.t(
      'navigation.tracks'
    ),
    link: formatArtistTracksLink({
      artistName
    })
  }
}
