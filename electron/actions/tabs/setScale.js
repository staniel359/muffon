import getTabs from './get.js'
import setTabBounds from '../tab/setBounds.js'
import setViewScale from '../view/setScale.js'

export default function () {
  function setTabBoundsAndScale (
    tab
  ) {
    setTabBounds(
      tab
    )

    setViewScale(
      tab
    )
  }

  getTabs()
    .forEach(
      setTabBoundsAndScale
    )
}
