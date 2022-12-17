import i18n from '#/plugins/i18n'
import {
  radio as formatRadioLink
} from '@/helpers/formatters/links'

export default function () {
  const title = i18n.global.t(
    'navigation.radio'
  )

  const {
    path
  } = formatRadioLink()

  return {
    icon: 'radio',
    title,
    path
  }
}
