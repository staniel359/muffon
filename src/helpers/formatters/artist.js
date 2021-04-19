export function defaultImages () {
  return [formatDefaultImage()]
}

function formatDefaultImage () {
  return Object.fromEntries(
    formatDefaultImageSizes()
  )
}

function formatDefaultImageSizes () {
  return defaultImageSizes.map(
    formatDefaultImageSize
  )
}

const defaultImageSizes = [
  ['original', ''],
  ['large', '600x600'],
  ['medium', '300x300'],
  ['small', '174s'],
  ['extrasmall', '64s']
]

function formatDefaultImageSize ([sizeName, size]) {
  return [
    sizeName,
    formatDefaultImageSizeLink(size)
  ]
}

function formatDefaultImageSizeLink (size) {
  return `https://lastfm.freetls.fastly.net/i/u/${size}` +
    '/2a96cbd8b46e442fc41c2b86b821562f.png'
}
