import getMainWindowSize from '../mainWindow/getSize.js'

export default async function () {
  const [
    width,
    height
  ] = await getMainWindowSize()

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
