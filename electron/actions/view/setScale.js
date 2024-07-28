import getElectronStoreKey from '../electronStore/getKey.js'

export default function (
  view
) {
  const scale =
    getElectronStoreKey(
      'layout.scale'
    )

  const isChangeScale = (
    scale >= 0
  )

  if (isChangeScale) {
    view
      .webContents
      .setZoomFactor(
        scale
      )
  }
}
