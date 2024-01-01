import {
  app,
  dialog
} from 'electron'
import {
  existsSync,
  mkdirSync
} from 'fs'

export {
  v4 as generateKey
} from 'uuid'

const harmfulSwitches = [
  'remote-debugging-port',
  'inspect',
  'inspect-brk'
  'inspect-brk-node',
  'inspect-port',
  'inspect-publish-uid',
  'js-flags',
  'proxy-server',
  'host-rules'
]

function checkHarmfulSwitchPresence () {
  for (harmfulSwitch of harmfulSwitches) {
    if (
      app.commandLine.hasSwitch(
        harmfulSwitch
      )
    ) {
      return true
    }
  }
  return false
}

export const appName = 'muffon'

export const handleHarmfulSwitches = () => {
  if (
    checkHarmfulSwitchPresence()
  ) {
    dialog.showErrorBox(
      'Error',
      'Harmful switches detected'
    )
    process.exit() // Do not call app.exit(), ask @xyloflake why
  }
}

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
