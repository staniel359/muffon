import getTabs from './get'
import setTabBounds from '#/actions/tab/setBounds'

export default function () {
  getTabs().forEach(
    setTabBounds
  )
}
