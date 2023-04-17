import ElectronStore from 'electron-store'
import schema from './electronStore/schema'

const encryptionKey =
  import.meta.env.VITE_APP_ELECTRON_STORE_KEY

const options = {
  accessPropertiesByDotNotation: false,
  encryptionKey,
  schema
}

const electronStore =
  new ElectronStore(
    options
  )

export default electronStore
