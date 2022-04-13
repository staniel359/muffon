import ElectronStore from 'electron-store'
import schema from '*/helpers/data/plugins/electronStore/schema'

export default new ElectronStore(
  {
    accessPropertiesByDotNotation: false,
    schema,
    watch: true
  }
)
