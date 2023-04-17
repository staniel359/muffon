import {
  app
} from 'electron'
import {
  handleAllWindowsClosed
} from '#/handlers/app'

export default function () {
  app.on(
    'window-all-closed',
    handleAllWindowsClosed
  )
}
