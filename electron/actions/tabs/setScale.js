import getTabs from './get'
import setTabBounds from '#/actions/tab/setBounds'
import setTabScale from '#/actions/tab/setScale'

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
