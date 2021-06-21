import { pluralize } from '#/actions/plugins/i18n'
import { number as formatNumber } from '#/formatters'

export const listenersCount = number => {
  return pluralize(
    'shared.listener',
    number,
    { number: formatNumber(number) }
  )
}
