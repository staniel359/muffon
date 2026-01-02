import getAboutWindowSize from '../aboutWindow/getSize.js'

export default async function () {
  const [
    width,
    height
  ] = await getAboutWindowSize()

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
