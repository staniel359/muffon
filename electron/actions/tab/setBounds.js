import getElectronStoreKey from '../electronStore/getKey.js'
import {
  isLinux
} from '../../helpers/utils.js'

export default function (
  tab
) {
  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  const isFullScreen =
    mainWindow.isFullScreen()

  const topOffsetScaled =
    Math.round(
      tabsPanelHeight * scale
    )

  const topOffsetComputed = (
    isFullScreen ? 0 : topOffsetScaled
  )

  function getWindowSize () {
    if (isLinux) {
      return mainWindow.getSize()
    } else {
      return mainWindow.getContentSize()
    }
  }

  const [
    width,
    height
  ] = getWindowSize()

  const heightScaled = (
    height - topOffsetComputed
  )

  const options = {
    x: 0,
    y: topOffsetComputed,
    width,
    height: heightScaled
  }

  tab.setBounds(
    options
  )
}
