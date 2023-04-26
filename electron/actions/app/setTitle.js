import {
  appName
} from '#/helpers/utils'

export default function (
  value
) {
  mainWindow.setTitle(
    value || appName
  )
}
