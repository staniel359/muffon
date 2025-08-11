import getSettings from '../../actions/settings/get.js'
import getSettingsKey from '../../actions/settings/getKey.js'
import addSettingsKeyValue
  from '../../actions/settings/addKeyValue.js'
import deleteSettingsKeyValue
  from '../../actions/settings/deleteKeyValue.js'

export function handleGetSettings () {
  return getSettings()
}

export function handleGetSettingsKey (
  _,
  key
) {
  return getSettingsKey(
    key
  )
}

export function handleAddSettingsKeyValue (
  _,
  {
    key,
    value
  }
) {
  const valueFormatted =
    JSON.parse(
      value
    )

  return addSettingsKeyValue(
    {
      key,
      value: valueFormatted
    }
  )
}

export function handleDeleteSettingsKeyValue (
  _,
  {
    key,
    valueId
  }
) {
  return deleteSettingsKeyValue(
    {
      key,
      valueId
    }
  )
}
