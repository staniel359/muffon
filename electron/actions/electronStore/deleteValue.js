import getKey from './getKey.js'
import setData from './setData.js'

export default function (
  key,
  uuid
) {
  const oldValue =
    getKey(
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

  return setData(
    {
      [key]: newValue
    }
  )
}
