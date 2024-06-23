import {
  app,
  dialog
} from 'electron'
import {
  existsSync,
  mkdirSync
} from 'node:fs'

export {
  v4 as generateKey
} from 'uuid'

const systems = {
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

function isMatchedPlatform (
  [
    _,
    platforms
  ]
) {
  return platforms.includes(
    process.platform
  )
}

const systemName =
  Object.entries(
    systems
  ).find(
    isMatchedPlatform
  )[0]

process.env.systemName = systemName

export const isDevelopment = !app.isPackaged

export const isShowDevTools = (
  process.env.DEV_TOOLS === 'true'
)

export const isWindows = (
  systemName === 'windows'
)

export const isMacos = (
  systemName === 'macos'
)

export const isLinux = (
  systemName === 'linux'
)

export const isSingleInstance =
  app.requestSingleInstanceLock()

export const deepLinksProtocol = `${appName}://`

export const shortcuts = {
  exit: [
    'CommandOrControl+Q'
  ]
}

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
