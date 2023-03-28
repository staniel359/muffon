import {
  ipcRenderer
} from 'electron'
import {
  getDistinctArray
} from '@/helpers/utils'

export async function get (
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

export async function update (
  key,
  item
) {
  const historyKey = `history.${key}`

  const history =
    await ipcRenderer.invoke(
      'get-electron-store-key',
      historyKey
    )

  const isNewItem = (
    item && (
      item !== history[0]
    )
  )

  if (isNewItem) {
    const newHistory = [
      item,
      ...history
    ]

    const data = {
      [historyKey]: newHistory
    }

    const dataFormatted =
      JSON.stringify(
        data
      )

    ipcRenderer.invoke(
      'set-electron-store-data',
      dataFormatted
    )
  }
}
