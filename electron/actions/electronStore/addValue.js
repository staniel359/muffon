import getKey from './getKey'
import setData from './setData'

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
