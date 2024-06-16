import getViews from '../views/get.js'
import setElectronStoreData from '../electronStore/setData.js'

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
    setElectronStoreData(
      data
    )
  }
}
