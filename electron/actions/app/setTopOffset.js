import {
  isMac
} from '../../utils.js'

export default function setTopOffset () {
  const isFullScreen =
    mainWindow.isFullScreen()

  const titleBarHeight =
    (isMac && !isFullScreen) ? 28 : 0

  topOffset = (
    titleBarHeight +
      tabsPanelHeight
  )
}
