import {
  isMac
} from '#/utils'

export default function () {
  const isFullScreen =
    mainWindow.isFullScreen()

  const titleBarHeight =
    (isMac && !isFullScreen) ? 28 : 0

  topOffset = (
    titleBarHeight +
      tabsPanelHeight
  )
}
