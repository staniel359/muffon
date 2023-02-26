import i18n from '#/plugins/i18n'
import {
  main as formatReleasesMainLink,
  newReleases as formatReleasesNewLink,
  upcoming as formatReleasesUpcomingLink
} from '@/helpers/formatters/links/releases'

export default function (
  {
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.releasesCollection.${scope}`
      )
    } else {
      return i18n.global.t(
        'navigation.releases'
      )
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'new':
        return formatReleasesNewLink()
      case 'upcoming':
        return formatReleasesUpcomingLink()
      default:
        return formatReleasesMainLink()
    }
  }

  const link = formatLink()

  return {
    icon: 'release',
    title,
    link,
    path: link.path
  }
}
