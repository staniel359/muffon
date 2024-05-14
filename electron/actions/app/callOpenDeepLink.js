import {
  isWindows,
  isLinux
} from '../../helpers/utils.js'
import openDeepLink from '../app/openDeepLink.js'

export default function () {
  if (isWindows || isLinux) {
    openDeepLink(
      {
        args: process.argv
      }
    )
  }
}
