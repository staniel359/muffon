import ElectronStore from 'electron-store'
import schema from './electronStore/schema.js'

const encryptionKey =
  process.env.VUE_APP_ELECTRON_STORE_KEY

const options = {
  accessPropertiesByDotNotation: false,
  watch: true,
  encryptionKey,
  schema
}

export default new ElectronStore(
  options
)
