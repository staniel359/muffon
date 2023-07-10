import getElectronStoreData from '#/actions/electronStore/getData'
import getElectronStoreKey from '#/actions/electronStore/getKey'
import addElectronStoreValue from '#/actions/electronStore/addValue'
import deleteElectronStoreValue
  from '#/actions/electronStore/deleteValue'
import setElectronStoreData from '#/actions/electronStore/setData'

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
