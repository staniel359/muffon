import {
  appName
} from '#/utils'

export default function (
  value
) {
  tray.setToolTip(
    value || appName
  )
}
