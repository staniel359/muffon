import getSettingsKey from './getKey.js'
import setSettings from './set.js'

export default function (
  {
    key,
    valueId
  }
) {
  const oldValue =
    getSettingsKey(
      key
    )

  function isMatchedItem (
    itemData
  ) {
    return (
      itemData.uuid !== valueId
    )
  }

  const newValue = [
    ...oldValue.filter(
      isMatchedItem
    )
  ]

  return setSettings(
    {
      [key]: newValue
    }
  )
}
