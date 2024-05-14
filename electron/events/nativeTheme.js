import {
  nativeTheme
} from 'electron'
import {
  handleNativeThemeUpdated
} from '../handlers/nativeTheme.js'

export default function () {
  nativeTheme.on(
    'updated',
    handleNativeThemeUpdated
  )
}
