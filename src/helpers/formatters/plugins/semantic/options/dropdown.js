import layoutStore from '@/stores/layout'
import i18n from '@/plugins/i18n'

export function main (
  {
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

  return {
    on: 'hover',
    transition: 'fade down',
    collapseOnActionable: false,
    delay: {
      show: 0,
      hide: 150
    },
    preserveHTML: false,
    context,
    message,
    onChange
  }
}
