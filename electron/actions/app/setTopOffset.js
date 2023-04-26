import {
  isMac
} from '#/helpers/utils'

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
