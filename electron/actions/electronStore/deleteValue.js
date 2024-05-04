import getElectronStoreKey from './getKey'
import setElectronStoreData from './setData'

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

  const newValue = [
    ...oldValue.filter(
      isMatchedItem
    )
  ]

  return setElectronStoreData(
    {
      [key]: newValue
    }
  )
}
