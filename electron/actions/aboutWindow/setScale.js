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
    scale >= 0
  )

  if (isChangeScale) {
    const {
      width,
      height
    } = windowsDefaultSizes.about

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

    aboutWindow.setMinimumSize(
      Math.round(
        minimumWidthScaled
      ),
      Math.round(
        minimumHeightScaled
      )
    )

    aboutWindow.setSize(
      Math.round(
        widthScaled
      ),
      Math.round(
        heightScaled
      )
    )

    aboutWindow.center()
  }
}
