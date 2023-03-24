import {
  nativeTheme
} from 'electron'

export default function checkTheme () {
  const isDarkMode =
    nativeTheme.shouldUseDarkColors

  return {
    isDarkMode
  }
}
