import getMainWindowSize from '../mainWindow/getSize.js'

export default function () {
  const [
    width,
    height
  ] = getMainWindowSize()

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
