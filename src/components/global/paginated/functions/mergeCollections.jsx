import merge from 'deepmerge'

export default function mergeCollections () {
  const { isForward } = this.state

  const collectionsArray = [
    { ...this.state.collection },
    this.paginateCollection()
  ]

  const collections = isForward ? collectionsArray : collectionsArray.reverse()

  const arrayMerge = (originalArray, newArray, options) => {
    const { clientPageLimit } = this.props

    const isFull = array => array.length === clientPageLimit

    if (isFull(originalArray)) {
      return originalArray
    } else if (isFull(newArray)) {
      return newArray
    } else {
      return merge(originalArray, newArray)
    }
  }

  return merge(...collections, { arrayMerge })
}
