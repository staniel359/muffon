import layoutStore from '@/stores/layout'
import icons from '@/helpers/data/icons'

export function main (
  {
    message,
    status,
    className
  }
) {
  const {
    visibleContext,
    isDarkMode
  } = layoutStore()

  const successIcon =
    `green ${icons.success}`

  const statusIcons = {
    success: successIcon
  }

  const icon =
    statusIcons[
      status
    ]

  const variation = (
    isDarkMode ? 'inverted' : null
  )

  const classNameFormatted = [
    variation,
    className
  ].filter(
    e => e
  ).join(
    ' '
  )

  return {
    showIcon: icon,
    context: visibleContext,
    class: classNameFormatted,
    newestOnTop: true,
    message
  }
}
