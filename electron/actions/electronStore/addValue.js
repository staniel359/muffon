import getKey from './getKey.js'
import setData from './setData.js'

export default function (
  key,
  value
) {
  const oldValue =
    getKey(
      key
    )

  const newValue = [
    ...oldValue,
    value
  ]

  return setData(
    {
      [key]: newValue
    }
  )
}
