import {
  appName
} from '../../helpers/utils.js'

export default function (
  value
) {
  tray.setToolTip(
    value || appName
  )
}
