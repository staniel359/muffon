import ElectronStore from 'electron-store'
import schema from './electronStore/schema'
import {
  isDevelopment
} from '#/helpers/utils'
import {
  electronStoreKey
} from '#/helpers/env'

const encryptionKey = (
  isDevelopment ? null : electronStoreKey
)

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
