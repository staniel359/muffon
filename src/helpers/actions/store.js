import {
  ipcRenderer
} from 'electron'
import store from '@/plugins/store'
import i18n from '#/plugins/i18n'
import storeKeysActions from '@/helpers/data/store'

export function updateLocal (
  key,
  value
) {
  const action =
    storeKeysActions[
      key
    ]

  if (action) {
    store.dispatch(
      action,
      value
    )
  }

  if (key === 'profile.language') {
    i18n.global.locale = value
  }
}

export function updateGlobal (
  data,
  {
    isSave = true
  } = {}
) {
  return ipcRenderer.invoke(
    'update-store',
    JSON.stringify(
      data
    ),
    {
      isSave
    }
  )
}
