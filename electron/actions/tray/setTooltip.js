import {
  appName
} from '../../helpers/utils.js'

export default function (
  value
) {
  if (!tray) { return }

  tray.setToolTip(
    value || appName
  )
}
