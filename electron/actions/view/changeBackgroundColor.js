import getElectronStoreKey from '../electronStore/getKey.js'
import {
  colors
} from '../../helpers/utils.js'

export default function (
  view
) {
  const isDarkMode =
    getElectronStoreKey(
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
}
