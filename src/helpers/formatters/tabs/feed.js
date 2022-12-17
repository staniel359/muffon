import i18n from '#/plugins/i18n'
import {
  feed as formatFeedLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.feed'
  )

  const {
    path
  } = formatFeedLink()

  return {
    icon: 'feed',
    title,
    path
  }
}
