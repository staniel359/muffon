import electronStore from '../../../shared/plugins/electronStore.js'

export default function setBounds (
  tab
) {
  const scale =
    electronStore.get(
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
