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

  function formatPath () {
    switch (scope) {
      case 'new':
        return formatReleasesNewLink().path
      case 'upcoming':
        return formatReleasesUpcomingLink().path
      default:
        return formatReleasesMainLink().path
    }
  }

  return {
    icon: 'record vinyl',
    title: formatTitle(),
    path: formatPath()
  }
}
