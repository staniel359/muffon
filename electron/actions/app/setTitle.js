import {
  appName
} from '../../utils.js'

export default function (
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}
