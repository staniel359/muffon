const ElectronStore = require(
  'electron-store'
)

process.env.MUFFON_ELECTRON_STORE_ENCRYPTION_KEY =
  'secretKey'

const encryptionKey =
  process.env.MUFFON_ELECTRON_STORE_ENCRYPTION_KEY

const electronStore =
  new ElectronStore(
    {
      accessPropertiesByDotNotation: false,
      encryptionKey
    }
  )

module.exports = electronStore
