import { generateKey } from '#/utils'

export const collection = collection => {
  const formatCollectionItemData = item => {
    const isString = typeof item === 'string'

    if (isString) {
      return { name: item }
    } else {
      return item
    }
  }

  const formatCollectionItem = item => {
    return {
      uuid: generateKey(),
      ...formatCollectionItemData(item)
    }
  }

  return [...collection].map(
    formatCollectionItem
  )
}

export const number = value => {
  return value.toLocaleString('eu')
}

export const seconds = value => {
  return new Date(value * 1000)
    .toISOString()
    .substr(14, 5)
}
