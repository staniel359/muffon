import {
  nativeTheme
} from 'electron'
import {
  handleNativeThemeUpdated
} from '../handlers/nativeTheme.js'

export default function set () {
  nativeTheme.on(
    'updated',
    handleNativeThemeUpdated
  )
}
