import getElectronStoreKey from '../electronStore/getKey.js'

export default function setBounds (
  tab
) {
  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  const topOffsetScaled =
    Math.round(
      topOffset * scale
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
