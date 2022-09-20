import i18n from '@/plugins/i18n'
import {
  multitag as formatMultitagLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.multitag'
  )

  const {
    path
  } = formatMultitagLink()

  return {
    icon: 'tags',
    title,
    path
  }
}
