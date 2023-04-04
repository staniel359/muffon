import getTabs from './get.js'
import setTabBounds from '../tab/setBounds.js'

export default function (
  value
) {
  getTabs().forEach(
    setTabBounds
  )
}
