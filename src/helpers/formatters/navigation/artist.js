import i18n from '*/plugins/i18n'
import {
  main as formatArtistMainLink
} from '*/helpers/formatters/links/artist'

export default function ({ artistName, scope }) {
  const formatLink = () => {
    if (scope) {
      return formatArtistMainLink({
        artistName
      })
    }
  }

  const formatSubpageSection = () => {
    if (scope) {
      return {
        name: i18n.global.t(
          `navigation.${scope}`
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
      isActive: !scope,
      link: formatLink()
    },
    formatSubpageSection()
  ].filter(e => e)
}
