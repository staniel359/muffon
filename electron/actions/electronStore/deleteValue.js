import getElectronStoreKey from './getKey.js'
import setElectronStoreData from './setData.js'

export default function (
  key,
  uuid
) {
  const oldValue =
    getElectronStoreKey(
      key
    )

  function isMatchedItem (
    itemData
  ) {
    return (
      itemData.uuid !== uuid
    )
  }

  const newValue = oldValue.filter(
    isMatchedItem
  )

  return setElectronStoreData(
    {
      [key]: newValue
    }
  )
}
