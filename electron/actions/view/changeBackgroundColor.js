import getSettingsKey from '../settings/getKey.js'
import {
  colors
} from '../../helpers/utils.js'

export default function (
  view
) {
  const isDarkMode =
    getSettingsKey(
      'layout.isDarkMode'
    )

  const {
    black,
    white
  } = colors

  const backgroundColor = (
    isDarkMode ? black : white
  )

  view.setBackgroundColor(
    backgroundColor
  )

  view
    .webContents
    .insertCSS(
      `html, body { background-color: ${backgroundColor} !important; }`
    )
}
