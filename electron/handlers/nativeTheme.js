import getElectronStoreKey from '../actions/electronStore/getKey.js'
import updateTheme from '../actions/app/updateTheme.js'

export function handleNativeThemeUpdated () {
  const isWithSystemTheme =
    getElectronStoreKey(
      'layout.isWithSystemTheme'
    )

  if (isWithSystemTheme) {
    updateTheme()
  }
}
