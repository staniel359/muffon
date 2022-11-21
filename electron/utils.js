const fs = require(
  'fs'
)

const appName = 'muffon'

const isDevelopment =
  process.env.NODE_ENV === 'development'

const isMac =
  process.platform === 'darwin'

const isLinux =
  process.platform === 'linux'

function createFolderIfNotExists (
  path
) {
  const isFolderExist =
    fs.existsSync(
      path
    )

  if (!isFolderExist){
    fs.mkdirSync(
      path
    )
  }
}

module.exports = {
  appName,
  isDevelopment,
  isMac,
  isLinux,
  createFolderIfNotExists
}
