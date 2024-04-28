import getElectronStoreKey from '#/actions/electronStore/getKey'
import {
  colors
} from '#/helpers/utils'

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
