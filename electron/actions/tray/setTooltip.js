import {
  appName
} from '../../utils.js'

export default function (
  value
) {
  tray.setToolTip(
    value || appName
  )
}
