import getElectronStoreKey from '#/actions/electronStore/getKey'
import updateTheme from '#/actions/app/updateTheme'

export function handleNativeThemeUpdated () {
  const isWithSystemTheme =
    getElectronStoreKey(
      'layout.isWithSystemTheme'
    )

  if (isWithSystemTheme) {
    updateTheme()
  }
}
