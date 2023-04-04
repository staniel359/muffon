import getTabs from './get.js'
import resetTabBounds from '../tab/resetBounds.js'

export default function (
  value
) {
  getTabs().forEach(
    resetTabBounds
  )
}
