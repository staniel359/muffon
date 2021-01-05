import React from 'react'
import ErrorMessage from 'global/ErrorMessage'
import CollectionData from './paginated/CollectionData'
import paginateCollection from './paginated/functions/paginateCollection'
import mergeCollections from './paginated/functions/mergeCollections'
import paginationData from './paginated/functions/paginationData'

export default class Paginated extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { clientPage: 1, isForward: true }

    this.paginateCollection = paginateCollection.bind(this)
    this.mergeCollections = mergeCollections.bind(this)
    this.paginationData = paginationData.bind(this)
  }

  componentDidMount () {
    this.setData()
  }

  setData () {
    const { clientPage } = this.state

    const collection = this.mergeCollections()
    const clientPageCollection = collection[clientPage] || []

    this.setState({ collection, clientPageCollection })
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleDataChange(prevProps)
    this.handleClientPageCollectionChange(prevState)
    this.handleClientPageChange(prevState)
    this.handleError()
  }

  handleDataChange (prevProps) {
    const { data } = this.props

    const isDataChanged = data !== prevProps.data

    isDataChanged && this.setData()
  }

  handleClientPageCollectionChange (prevState) {
    const { clientPageCollection } = this.state

    if (clientPageCollection) {
      const isClientPageCollectionChanged =
        clientPageCollection !== prevState.clientPageCollection

      isClientPageCollectionChanged && this.checkCollection()
    }
  }

  checkCollection () {
    const { getData } = this.props

    const nextPage = this.nextResponsePage()

    !this.isCollectionFull() && getData(nextPage)
  }

  isCollectionFull () {
    const { clientPageLimit } = this.props
    const { clientPage, clientPageCollection } = this.state

    const clientOffset = clientPageLimit * (clientPage - 1)
    const remainingItems = this.totalItems() - clientOffset
    const clientCurrentPageLimit = Math.min(remainingItems, clientPageLimit)

    return clientPageCollection.length >= clientCurrentPageLimit
  }

  totalItems () {
    const { responseTotalPages, responsePageLimit } = this.props

    return responseTotalPages * responsePageLimit
  }

  nextResponsePage () {
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

  handleClientPageChange (prevState) {
    const { clientPage } = this.state

    const isClientPageChanged = clientPage !== prevState.clientPage

    if (isClientPageChanged) {
      const { collection } = this.state

      const clientPageCollection = collection[clientPage] || []

      this.setState({ clientPageCollection })
    }
  }

  handleError () {
    const { error } = this.props

    error && this.setState({ clientPageCollection: null })
  }

  collectionData () {
    const { clientPageCollection } = this.state
    const {
      dataName,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading,
      children,
      hideSearch
    } = this.props

    const collectionDataProps = {
      dataName,
      clientPageCollection,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading,
      children,
      hideSearch
    }

    return <CollectionData {...collectionDataProps} />
  }

  errorData () {
    const { error, getData, responsePage } = this.props

    const handleRefresh = () => getData(responsePage)
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  render () {
    const { clientPageCollection } = this.state
    const { error, responseTotalPages, data, clientPageLimit } = this.props

    const collectionData = clientPageCollection && this.collectionData()

    const errorData = error && this.errorData()

    const contentData = collectionData || errorData

    const isResponsePagePageable = data && data.length > clientPageLimit
    const isResponsePageable = responseTotalPages > 1 || isResponsePagePageable
    const paginationData = isResponsePageable && this.paginationData()

    return (
      <React.Fragment>
        <div>{contentData}</div>
        <div>{paginationData}</div>
      </React.Fragment>
    )
  }
}
