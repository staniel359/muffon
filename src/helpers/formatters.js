import { generateKey } from '#/utils'

export function collection (collection) {
  return [...collection].map(formatCollectionItem)
}

function formatCollectionItem (item) {
  return {
    uuid: generateKey(),
    ...formatCollectionItemData(item)
  }
}

function formatCollectionItemData (item) {
  if (isString(item)) {
    return { name: item }
  } else {
    return item
  }
}

function isString (item) {
  return typeof item === 'string'
}

export function number (number) {
  return number.toLocaleString('eu')
}

export function seconds (seconds) {
  return new Date(seconds * 1000)
    .toISOString()
    .substr(14, 5)
}
