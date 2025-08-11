import getSettingsKey from '../settings/getKey.js'

export default function (
  view
) {
  const scale =
    getSettingsKey(
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
