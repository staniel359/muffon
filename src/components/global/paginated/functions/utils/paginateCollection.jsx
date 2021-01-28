export default function paginateCollection () {
  const { responsePageLimit, responsePage, clientPageLimit } = this.props

  const responseOffset = responsePageLimit * (responsePage - 1)
  const clientStartPage = Math.floor(responseOffset / clientPageLimit) + 1

  const collection = [...this.props.data]
  collection.length = responsePageLimit

  const collectionData = []

  for (let page = clientStartPage; collection.length > 0; page++) {
    const isFirstPage = collectionData.length === 0
    const prevPageRemainder = isFirstPage ? responseOffset % clientPageLimit : 0
    const pageDataLength = clientPageLimit - prevPageRemainder
    const pageData = collection.splice(0, pageDataLength)

    collectionData.push([page, pageData])
  }

  return Object.fromEntries(collectionData)
}
