const ElectronStore = require(
  'electron-store'
)
const schema = require(
  './electronStore/schema'
)

const encryptionKey =
  process.env.VUE_APP_ELECTRON_STORE_KEY

const options = {
  accessPropertiesByDotNotation: false,
  watch: true,
  encryptionKey,
  schema
}

const electronStore =
  new ElectronStore(
    options
  )

module.exports = electronStore
