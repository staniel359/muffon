import {
  app
} from 'electron'
import {
  handleAllWindowsClosed,
  handleSecondInstance,
  handleOpenUrl
} from '#/handlers/app'

export default function () {
  app.on(
    'window-all-closed',
    handleAllWindowsClosed
  )

  app.on(
    'second-instance',
    handleSecondInstance
  )

  app.on(
    'open-url',
    handleOpenUrl
  )
}
