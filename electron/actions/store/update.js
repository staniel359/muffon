import getTabs from '#/actions/tabs/get'
import setElectronStoreData from '#/actions/electronStore/setData'
import setScale from '#/actions/app/setScale'

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

  const views = [
    mainView,
    aboutView,
    ...getTabs()
  ]

  views.forEach(
    updateViewStore
  )

  if (isSave) {
    setElectronStoreData(
      data
    )

    const scale =
      data[
        'layout.scale'
      ]

    const isChangeScale = (
      scale >= 0
    )

    if (isChangeScale) {
      setScale(
        scale
      )
    }
  }
}
