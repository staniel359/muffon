export const defaultImages = () => {
  const formatDefaultImage = () => {
    const formatDefaultImageSizes = () => {
      const defaultImageSizes = [
        ['original', ''],
        ['large', '600x600'],
        ['medium', '300x300'],
        ['small', '174s'],
        ['extrasmall', '64s']
      ]

      const formatDefaultImageSizeLink = size => {
        return `https://lastfm.freetls.fastly.net/i/u/${size}` +
          '/2a96cbd8b46e442fc41c2b86b821562f.png'
      }

      const formatDefaultImageSize = ([sizeName, size]) => {
        return [
          sizeName,
          formatDefaultImageSizeLink(size)
        ]
      }

      return defaultImageSizes.map(
        formatDefaultImageSize
      )
    }

    return Object.fromEntries(
      formatDefaultImageSizes()
    )
  }

  return [formatDefaultImage()]
}
