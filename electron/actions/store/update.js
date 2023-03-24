import getTabs from '../tabs/get.js'

export default function update (
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
    mainWindow,
    aboutWindow,
    ...getTabs()
  ]

  views.forEach(
    updateViewStore
  )

  if (isSave) {
    mainWindow
      .webContents
      .send(
        'update-electron-store',
        data
      )
  }
}
