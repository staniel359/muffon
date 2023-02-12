import i18n from '#/plugins/i18n'
import {
  main as formatHistoryMainLink,
  events as formatHistoryEventsLink
} from '@/helpers/formatters/links/history'

export default function (
  {
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.historyModels.${scope}`
      )
    } else {
      return i18n.global.t(
        'navigation.history'
      )
    }
  }

  function formatPath () {
    switch (scope) {
      case 'events':
        return formatHistoryEventsLink().path
      default:
        return formatHistoryMainLink().path
    }
  }

  return {
    icon: 'history',
    title: formatTitle(),
    path: formatPath()
  }
}
