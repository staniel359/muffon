const {
  nativeImage
} = require(
  'electron'
)
const {
  isDevelopment
} = require(
  './utils'
)

const path = require(
  'path'
)

const publicPath =
  isDevelopment ? 'public' : ''

const iconPath =
  path.join(
    __dirname,
    '..',
    publicPath,
    'logo.png'
  )

const icon =
  nativeImage.createFromPath(
    iconPath
  )

const windowIcon =
  icon.resize(
    {
      width: 64,
      height: 64
    }
  )

const trayIcon =
  icon.resize(
    {
      width: 16,
      height: 16
    }
  )

module.exports = {
  windowIcon,
  trayIcon
}
