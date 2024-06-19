import setTrayTooltip from '../../actions/tray/setTooltip.js'
import toggleTray from '../../actions/tray/toggle.js'

export function handleSetTrayTooltip (
  _,
  value
) {
  setTrayTooltip(
    value
  )
}

export function handleToggleTray (
  _,
  boolean
) {
  toggleTray(
    boolean
  )
}
