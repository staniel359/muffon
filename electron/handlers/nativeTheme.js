import electronStore from '../../shared/plugins/electronStore.js'
import updateTheme from '../actions/app/updateTheme.js'

export function handleNativeThemeUpdated () {
  const isWithSystemTheme =
    electronStore.get(
      'layout.isWithSystemTheme'
    )

  if (isWithSystemTheme) {
    updateTheme()
  }
}
