import ElectronStore from 'electron-store'
import schema from '@/helpers/data/plugins/electronStore/schema'

const encryptionKey =
  process.env.VUE_APP_ELECTRON_STORE_KEY

export default new ElectronStore(
  {
    accessPropertiesByDotNotation: false,
    schema,
    watch: true,
    encryptionKey
  }
)
