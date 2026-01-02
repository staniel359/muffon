import getSettingsKey from '../settings/getKey.js'
import getMainWindowSize from '../mainWindow/getSize.js'

export default async function (
  tab
) {
  const scale =
    getSettingsKey(
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

  const [
    width,
    height
  ] = await getMainWindowSize()

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
