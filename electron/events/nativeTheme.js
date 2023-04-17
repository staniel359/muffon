import {
  nativeTheme
} from 'electron'
import {
  handleNativeThemeUpdated
} from '#/handlers/nativeTheme'

export default function () {
  nativeTheme.on(
    'updated',
    handleNativeThemeUpdated
  )
}
