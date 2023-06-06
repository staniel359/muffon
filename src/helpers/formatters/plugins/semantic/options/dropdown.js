import layoutStore from '@/stores/layout'
import i18n from '@/plugins/i18n'

export function main (
  {
    isSelection,
    onChange
  } = {}
) {
  const {
    visibleContext
  } = layoutStore()

  const context = (
    visibleContext || 'body'
  )

  const message = {
    noResults: i18n.global.t(
      'errors.notFound.header'
    )
  }

  const transition = (
    isSelection ? 'auto' : 'fade up'
  )

  return {
    on: 'hover',
    delay: {
      show: 0,
      hide: 150
    },
    context,
    message,
    transition,
    onChange
  }
}
