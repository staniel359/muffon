import getSettingsKey from './getKey.js'
import setSettings from './set.js'

export default function (
  {
    key,
    value
  }
) {
  const oldValue =
    getSettingsKey(
      key
    )

  const newValue = [
    ...oldValue,
    value
  ]

  return setSettings(
    {
      [key]: newValue
    }
  )
}
