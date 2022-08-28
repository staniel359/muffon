const appName = 'muffon'

const isDevelopment =
  process.env.NODE_ENV === 'development'

const isMac =
  process.platform === 'darwin'

const isLinux =
  process.platform === 'linux'

module.exports = {
  appName,
  isDevelopment,
  isMac,
  isLinux
}
