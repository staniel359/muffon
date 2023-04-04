import {
  nativeTheme
} from 'electron'

export default function () {
  const isDarkMode =
    nativeTheme.shouldUseDarkColors

  return {
    isDarkMode
  }
}
