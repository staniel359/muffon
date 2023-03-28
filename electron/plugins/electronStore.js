import ElectronStore from 'electron-store'
import schema from './electronStore/schema.js'

const encryptionKey =
  process.env.VITE_APP_ELECTRON_STORE_KEY

const options = {
  accessPropertiesByDotNotation: false,
  encryptionKey,
  schema
}

export default new ElectronStore(
  options
)
