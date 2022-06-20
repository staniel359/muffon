import ElectronStore from 'electron-store'
import schema from '*/helpers/data/plugins/electronStore/schema'

const encryptionKey =
  window
    .process
    .env
    .MUFFON_ELECTRON_STORE_ENCRYPTION_KEY

export default new ElectronStore(
  {
    accessPropertiesByDotNotation: false,
    schema,
    watch: true,
    encryptionKey
  }
)
