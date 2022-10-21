const ElectronStore = require(
  'electron-store'
)

const encryptionKey =
  process.env.VUE_APP_ELECTRON_STORE_KEY

const electronStore =
  new ElectronStore(
    {
      accessPropertiesByDotNotation: false,
      encryptionKey
    }
  )

module.exports = electronStore
