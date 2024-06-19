import createTray from './create.js'
import destroyTray from './destroy.js'

export default function (
  boolean
) {
  if (boolean && !tray) {
    createTray()
  } else {
    destroyTray()
  }
}
