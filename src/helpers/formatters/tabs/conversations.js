import i18n from '@/plugins/i18n'
import {
  main as formatConversationsLink
} from '@/helpers/formatters/links/conversations'

export default function () {
  const title =
    i18n.global.t(
      'navigation.conversations'
    )

  const link =
    formatConversationsLink()

  return {
    icon: 'conversation',
    title,
    link,
    path: link.path
  }
}
