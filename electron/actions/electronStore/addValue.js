import getElectronStoreKey from './getKey'
import setElectronStoreData from './setData'

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
