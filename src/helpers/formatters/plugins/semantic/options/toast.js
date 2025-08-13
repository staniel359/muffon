import layoutStore from '@/stores/layout'
import icons from '@/helpers/data/icons'
import {
  sanitizeString
} from '@/helpers/utils'

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

  const messageSanitized =
    sanitizeString(
      message
    )

  return {
    showIcon: icon,
    context: visibleContext,
    class: classNameFormatted,
    newestOnTop: true,
    message: messageSanitized
  }
}
