import ElectronStore from 'electron-store'
import schema from './electronStore/schema'
import {
  isDevelopment
} from '#/helpers/utils'
import {
  electronStoreKey
} from '#/helpers/env'
import {
  userDataPath
} from '#/helpers/paths'

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
