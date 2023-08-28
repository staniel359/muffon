import {
  isWindows,
  isLinux
} from '#/helpers/utils'
import openDeepLink from '#/actions/app/openDeepLink'

export default function () {
  if (isWindows || isLinux) {
    openDeepLink(
      {
        args: process.argv
      }
    )
  }
}
