import ElectronStore from 'electron-store'
import schema from '#/data/plugins/local/schema'

export default new ElectronStore({
  accessPropertiesByDotNotation: false,
  schema
})
