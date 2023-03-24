import getTabs from './get.js'
import resetTabBounds from '../tab/resetBounds.js'

export default function resetBounds (
  value
) {
  getTabs().forEach(
    resetTabBounds
  )
}
