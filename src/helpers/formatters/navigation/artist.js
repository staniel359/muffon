import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { localize } from '#/actions/plugins/i18n'

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
        name: localize(
          `layout.navigation.${pageNameKey}`
        ),
        isActive: true
      }
    }
  }

  return [
    {
      name: localize(
        'layout.navigation.artists'
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
