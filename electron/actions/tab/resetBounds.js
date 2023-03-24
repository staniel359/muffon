export default function resetBounds (
  tab
) {
  const [
    width,
    height
  ] = mainWindow.getContentSize()

  const options = {
    x: 0,
    y: 0,
    width,
    height
  }

  tab.setBounds(
    options
  )
}
