import {
  app
} from 'electron'
import {
  handleAllWindowsClosed
} from '../handlers/app.js'

export default function set () {
  app.on(
    'window-all-closed',
    handleAllWindowsClosed
  )
}
