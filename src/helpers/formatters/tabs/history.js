import i18n from '@/plugins/i18n'
import {
  main as formatHistoryLink,
  activity as formatHistoryActivityLink,
  player as formatHistoryPlayerLink,
  browser as formatHistoryBrowserLink
} from '@/helpers/formatters/links/history'

export default function (
  {
    scope
  }
) {
  function formatTitle () {
    if (scope) {
      return i18n.global.t(
        `navigation.historyCollection.${scope}`
      )
    } else {
      return i18n.global.t(
        'navigation.history'
      )
    }
  }

  const title = formatTitle()

  function formatLink () {
    switch (scope) {
      case 'activity':
        return formatHistoryActivityLink()
      case 'player':
        return formatHistoryPlayerLink()
      case 'browser':
        return formatHistoryBrowserLink()
      default:
        return formatHistoryLink()
    }
  }

  const link = formatLink()

  return {
    icon: 'history',
    title,
    link,
    path: link.path
  }
}
