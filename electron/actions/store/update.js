import getViews from '../views/get.js'
import setSettings from '../settings/set.js'

export default function (
  data,
  {
    isSave
  }
) {
  function updateViewStore (
    view
  ) {
    view
      .webContents
      .send(
        'update-store',
        data
      )
  }

  getViews().forEach(
    updateViewStore
  )

  if (isSave) {
    setSettings(
      data
    )
  }
}
