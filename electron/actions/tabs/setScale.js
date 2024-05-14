import getTabs from './get.js'
import setTabBounds from '../tab/setBounds.js'
import setTabScale from '../tab/setScale.js'

export default function (
  value
) {
  function setTabBoundsAndScale (
    tab
  ) {
    setTabBounds(
      tab
    )

    setTabScale(
      tab,
      value
    )
  }

  getTabs().forEach(
    setTabBoundsAndScale
  )
}
