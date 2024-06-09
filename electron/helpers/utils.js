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

const platforms = {
  windows: [
    'win32'
  ],
  macos: [
    'darwin'
  ],
  linux: [
    'linux',
    'freebsd',
    'openbsd'
  ]
}

export const colors = {
  white: '#ffffff',
  black: '#202122'
}

const harmfulSwitches = [
  'remote-debugging-port',
  'inspect',
  'inspect-brk',
  'inspect-brk-node',
  'inspect-port',
  'inspect-publish-uid',
  'js-flags',
  'proxy-server',
  'proxy-bypass-list',
  'host-rules'
]

export const appName = 'muffon'

const {
  env,
  platform
} = process

export const isDevelopment = !app.isPackaged

export const isShowDevTools = (
  env.DEV_TOOLS === 'true'
)

export const isMac =
  platforms
    .macos
    .includes(
      platform
    )

export const isLinux =
  platforms
    .linux
    .includes(
      platform
    )

export const isWindows =
  platforms
    .windows
    .includes(
      platform
    )

export const isSingleInstance =
  app.requestSingleInstanceLock()

export const deepLinksProtocol = `${appName}://`

export const releasesUrl =
  'https://api.github.com/repos/staniel359/muffon/releases/latest'

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

function isHarmfulSwitchPresent (
  harmfulSwitch
) {
  return app
    .commandLine
    .hasSwitch(
      harmfulSwitch
    )
}

export function handleHarmfulSwitches () {
  const isAnyHarmfulSwitches =
    !!harmfulSwitches.find(
      isHarmfulSwitchPresent
    )

  if (isAnyHarmfulSwitches) {
    dialog.showErrorBox(
      'Error',
      'Harmful switches detected'
    )

    // Do not call app.exit(), ask @xyloflake why
    process.exit()
  }
}
