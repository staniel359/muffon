import findTab from './find'

export default function (
  tabId
) {
  const tab =
    findTab(
      tabId
    )

  if (tab) {
    mainWindow
      .contentView
      .removeChildView(
        tab
      )

    tab
      .webContents
      .destroy()
  }
}
