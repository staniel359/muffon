import ElectronStore from 'electron-store'
import schema from './electronStore/schema.js'
import {
  isDevelopment
} from '../helpers/utils.js'
import {
  electronStoreKey
} from '../helpers/env.js'
import {
  userDataPath
} from '../helpers/paths.js'

const encryptionKey = (
  isDevelopment ? null : electronStoreKey
)

const options = {
  accessPropertiesByDotNotation: false,
  cwd: userDataPath,
  encryptionKey,
  schema,
  watch: true
}

const electronStore =
  new ElectronStore(
    options
  )

export default electronStore
