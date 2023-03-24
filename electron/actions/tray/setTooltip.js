import {
  appName
} from '../../utils.js'

export default function setTooltip (
  value
) {
  tray.setToolTip(
    value || appName
  )
}
