import getElectronStoreData from '../../actions/electronStore/getData.js'
import getElectronStoreKey from '../../actions/electronStore/getKey.js'
import addElectronStoreValue from '../../actions/electronStore/addValue.js'
import deleteElectronStoreValue
  from '../../actions/electronStore/deleteValue.js'
import setElectronStoreData from '../../actions/electronStore/setData.js'
import deleteElectronStoreKey from '../../actions/electronStore/deleteKey.js'

export function handleGetElectronStoreData () {
  return getElectronStoreData()
}

export function handleGetElectronStoreKey (
  _,
  key
) {
  return getElectronStoreKey(
    key
  )
}

export function handleAddElectronStoreValue (
  _,
  key,
  value
) {
  const valueFormatted =
    JSON.parse(
      value
    )

  return addElectronStoreValue(
    key,
    valueFormatted
  )
}

export function handleDeleteElectronStoreValue (
  _,
  key,
  uuid
) {
  return deleteElectronStoreValue(
    key,
    uuid
  )
}

export function handleSetElectronStoreData (
  _,
  data
) {
  const dataFormatted =
    JSON.parse(
      data
    )

  return setElectronStoreData(
    dataFormatted
  )
}

export function handleDeleteElectronStoreKey (
  _,
  key
) {
  return deleteElectronStoreKey(
    key
  )
}
