import {
  ipcRenderer
} from 'electron'
import {
  getDistinctArray
} from '@/helpers/utils'

export default async function (
  key,
  {
    isDistinct
  }
) {
  const history =
    await ipcRenderer.invoke(
      'get-electron-store-key',
      `history.${key}`
    )

  function getScopedHistory () {
    if (isDistinct) {
      return getDistinctArray(
        history
      )
    } else {
      return [
        ...history
      ]
    }
  }

  function formatHistoryItem (
    item
  ) {
    return {
      title: item
    }
  }

  return getScopedHistory().map(
    formatHistoryItem
  )
}
