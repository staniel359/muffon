import {
  appName
} from '../../utils.js'

export default function setTitle (
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}
