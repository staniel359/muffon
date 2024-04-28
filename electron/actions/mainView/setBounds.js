export default function () {
  const [
    width,
    height
  ] = mainWindow.getSize()

  const boundsOptions = {
    x: 0,
    y: 0,
    width,
    height
  }

  mainView.setBounds(
    boundsOptions
  )
}
