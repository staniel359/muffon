import i18n from '*/plugins/i18n'
import {
  main as formatArtistMainLink
} from '*/helpers/formatters/links/artist'

export default function ({ artistName, pageNameKey }) {
  const formatLink = () => {
    if (pageNameKey) {
      return formatArtistMainLink({
        artistName
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      return {
        name: i18n.global.t(
          `navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: i18n.global.t(
        'navigation.artists'
      )
    },
    {
      name: artistName,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
