import {
  app
} from 'electron'
import {
  existsSync,
  mkdirSync
} from 'fs'

export {
  v4 as generateKey
} from 'uuid'

export const appName = 'muffon'

export const isDevelopment = (
  process.env.NODE_ENV === 'development'
)

export const isShowDevTools = (
  process.env.DEV_TOOLS === 'true'
)

export const isMac = (
  process.platform === 'darwin'
)

export const isLinux = (
  process.platform === 'linux'
)

export const isWindows = (
  process.platform === 'win32'
)

export const isSingleInstance =
  app.requestSingleInstanceLock()

export const deepLinksProtocol = `${appName}://`

export function createFolderIfNotExists (
  path
) {
  const isFolderExist =
    existsSync(
      path
    )

  if (!isFolderExist) {
    mkdirSync(
      path
    )
  }
}
