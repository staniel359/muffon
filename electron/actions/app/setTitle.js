import {
  appName
} from '#/utils'

export default function (
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}
