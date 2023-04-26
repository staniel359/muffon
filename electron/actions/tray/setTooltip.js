import {
  appName
} from '#/helpers/utils'

export default function (
  value
) {
  tray.setToolTip(
    value || appName
  )
}
