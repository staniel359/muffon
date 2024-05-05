import {
  appName
} from '../../helpers/utils.js'

export default function (
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}
