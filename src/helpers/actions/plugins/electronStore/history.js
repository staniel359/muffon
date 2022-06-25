import electronStore from '*/plugins/electronStore'
import {
  getDistinctArray
} from '*/helpers/utils'

export function get (
  key,
  {
    isDistinct
  }
) {
  const historyKey = `history.${key}`

  const history =
    electronStore.get(
      historyKey
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

export function update (
  key,
  item
) {
  const historyKey = `history.${key}`

  const history =
    electronStore.get(
      historyKey
    )

  const isNewItem =
    item && (
      item.toLowerCase() !==
        history[0]?.toLowerCase()
    )

  const newHistory = [
    item,
    ...history
  ]

  if (isNewItem) {
    electronStore.set(
      {
        [historyKey]: newHistory
      }
    )
  }
}
