import getKey from './getKey'
import setData from './setData'

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
