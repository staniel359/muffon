export default function () {
  const [
    width,
    height
  ] = mainWindow.getContentSize()

  return [
    width,
    height
  ]
}
