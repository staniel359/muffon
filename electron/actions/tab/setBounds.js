import getElectronStoreKey from '#/actions/electronStore/getKey'

export default function (
  tab
) {
  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  const topOffsetScaled =
    Math.round(
      tabsPanelHeight * scale
    )

  const [
    width,
    height
  ] = mainWindow.getContentSize()

  const heightComputed = (
    height - tabsPanelHeight
  )

  const options = {
    x: 0,
    y: topOffsetScaled,
    width,
    height: heightComputed
  }

  tab.setBounds(
    options
  )
}
