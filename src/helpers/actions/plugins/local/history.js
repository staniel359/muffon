import local from '*/plugins/local'
import { getDistinctArray } from '*/helpers/utils'

export const get = (key, { isDistinct }) => {
  const historyKey = `history.${key}`
  const history = local.get(historyKey)

  const getScopedHistory = () => {
    if (isDistinct) {
      return getDistinctArray(history)
    } else {
      return [...history]
    }
  }

  return getScopedHistory().map(item => {
    return { title: item }
  })
}

export const update = (key, item) => {
  const historyKey = `history.${key}`
  const history = local.get(historyKey)

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
    local.set(
      historyKey, newHistory
    )
  }
}
