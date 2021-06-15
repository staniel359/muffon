import { artistMain as formatArtistMainLink } from '#/formatters/links'
import { localize } from '#/actions/plugins/i18n'

export function navigation ({ artistName = '...', pageNameKey }) {
  const artistsPageName = localize(
    'layout.navigation.artists'
  )

  const formatLink = () => {
    if (pageNameKey) {
      return formatArtistMainLink({
        artistName
      })
    }
  }

  const formatSubpageSection = () => {
    if (pageNameKey) {
      const artistPageName = localize(
        `layout.navigation.artist.${pageNameKey}`
      )

      return {
        name: artistPageName,
        isActive: true
      }
    }
  }

  return [
    { name: artistsPageName },
    {
      name: artistName,
      isActive: !pageNameKey,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
