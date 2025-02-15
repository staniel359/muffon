export default function () {
  function isTab (
    view
  ) {
    return view.isTab
  }

  return mainWindow
    .contentView
    .children
    .filter(
      isTab
    )
}
