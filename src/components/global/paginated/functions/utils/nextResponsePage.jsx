export default function nextResponsePage () {
  const { clientPageLimit, responsePageLimit } = this.props
  const { clientPage, clientPageCollection, isForward, isLast } = this.state

  const forwardPage = () => {
    const forwardPageOffset =
      (clientPage - 1) * clientPageLimit + clientPageCollection.length

    return forwardPageOffset / responsePageLimit + 1
  }

  const lastPage = () => {
    const lastPageOffset = this.totalItems() - clientPageCollection.length

    return lastPageOffset / responsePageLimit
  }

  const backwardPage = () => {
    const backwardPageOffset =
      clientPage * clientPageLimit - clientPageCollection.length

    return backwardPageOffset / responsePageLimit
  }

  if (isForward) {
    return forwardPage()
  } else if (isLast) {
    return lastPage()
  } else {
    return backwardPage()
  }
}
