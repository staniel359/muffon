import getElectronStoreKey from './getKey.js'
import setElectronStoreData from './setData.js'

export default function (
  key,
  value
) {
  const oldValue =
    getElectronStoreKey(
      key
    )

  const newValue = [
    ...oldValue,
    value
  ]

  return setElectronStoreData(
    {
      [key]: newValue
    }
  )
}
