import getTabs from './get'
import resetTabBounds from '#/actions/tab/resetBounds'

export default function (
  value
) {
  getTabs().forEach(
    resetTabBounds
  )
}
