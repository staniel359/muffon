const ElectronStore = require(
  'electron-store'
)

const electronStore =
  new ElectronStore(
    {
      accessPropertiesByDotNotation: false
    }
  )

const appLanguage =
  electronStore.get(
    'profile.language',
    'en'
  )

module.exports = {
  appLanguage
}
