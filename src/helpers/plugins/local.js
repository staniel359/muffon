import schema from '#/data/plugins/local/schema'

const ElectronStore = require('electron-store')

export default new ElectronStore({
  accessPropertiesByDotNotation: false,
  schema
})
