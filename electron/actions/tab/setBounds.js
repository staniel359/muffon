import getElectronStoreKey from '#/actions/electronStore/getKey'

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

  const [
    width,
    height
  ] = mainWindow.getContentSize()

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
