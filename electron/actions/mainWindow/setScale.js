import getSettingsKey from '../settings/getKey.js'
import getScreenWorkAreaSize from '../screen/getWorkAreaSize.js'
import {
  windowsDefaultSizes
} from '../../helpers/utils.js'

export default function () {
  const scale =
    getSettingsKey(
      'layout.scale'
    )

  const isChangeScale = (
    scale >= 0 &&
      !mainWindow.isMaximized()
  )

  if (isChangeScale) {
    const {
      width,
      height
    } = windowsDefaultSizes.main

    const widthScaled = width * scale

    const heightScaled = height * scale

    const {
      width: screenWorkAreaWidth,
      height: screenWorkAreaHeight
    } = getScreenWorkAreaSize()

    const minimumWidthScaled =
      Math.min(
        widthScaled,
        screenWorkAreaWidth - 50
      )

    const minimumHeightScaled =
      Math.min(
        heightScaled,
        screenWorkAreaHeight - 50
      )

    mainWindow.setMinimumSize(
      minimumWidthScaled,
      minimumHeightScaled
    )

    mainWindow.setSize(
      widthScaled,
      heightScaled
    )

    mainWindow.center()
  }
}
