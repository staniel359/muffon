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
  ] = mainWindow.getSize()

  const heightScaled = (
    height - topOffsetScaled
  )

  const options = {
    x: 0,
    y: topOffsetScaled,
    width,
    height: heightScaled
  }

  tab.setBounds(
    options
  )
}
