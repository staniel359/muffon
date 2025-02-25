export default function () {
  const [
    width,
    height
  ] = aboutWindow.getSize()

  const boundsOptions = {
    x: 0,
    y: 0,
    width,
    height
  }

  aboutView.setBounds(
    boundsOptions
  )
}
