import React from 'react'
import { Divider } from 'semantic-ui-react'
import merge from 'deepmerge'
import Pagination from 'global/Pagination'
import ErrorMessage from 'global/ErrorMessage'

export default class Paginated extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { clientCurrentPage: 1, isForward: true }
  }

  componentDidMount () {
    this.setResponseData()
    this.handleError()
  }

  componentDidUpdate (prevProps, prevState) {
    this.handleDataChange(prevProps)
    this.handleError()
  }

  handleDataChange (prevProps) {
    const { data } = this.props

    const isDataChanged = data !== prevProps.data

    isDataChanged && this.setResponseData()
  }

  handleError () {
    const { error } = this.props

    const clientPageCollection = null

    error && this.setState({ ...{ clientPageCollection } })
  }

  setResponseData () {
    const { isForward, clientCurrentPage } = this.state
    const { arrayMerge } = this

    const collectionsArray = [
      { ...this.state.collection },
      this.newCollection()
    ]

    const collections = isForward
      ? collectionsArray
      : collectionsArray.reverse()

    const collection = merge(...collections, { arrayMerge })

    this.setState({ ...{ collection } })

    const pageCollection = collection[clientCurrentPage] || []
    const clientPageCollection = pageCollection.filter(e => e)

    this.setState({ ...{ clientPageCollection } })
  }

  newCollection () {
    const {
      responsePageLimit,
      responseCurrentPage,
      clientPageLimit
    } = this.props

    const totalOffset = responsePageLimit * (responseCurrentPage - 1)
    const startPage = Math.floor(totalOffset / clientPageLimit) + 1

    const collection = [...this.props.data]
    collection.length = responsePageLimit

    const collectionArray = []

    for (let page = startPage; collection.length > 0; page++) {
      const isFirstPage = collectionArray.length === 0
      const prevPageRemainder = isFirstPage ? totalOffset % clientPageLimit : 0
      const pageArrayLength = clientPageLimit - prevPageRemainder
      const pageArray = collection.splice(0, pageArrayLength)

      collectionArray.push([page, pageArray])
    }

    return Object.fromEntries(collectionArray)
  }

  arrayMerge = (originalArray, newArray, options) => {
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

  paginationData () {
    const {
      responseTotalPages,
      responsePageLimit,
      clientPageLimit,
      isLoading,
      error
    } = this.props
    const { handlePageChange } = this

    const totalPages = Math.floor(
      (responseTotalPages * responsePageLimit) / clientPageLimit
    )
    const isDisabled = isLoading || !!error
    const paginationProps = { totalPages, isDisabled, handlePageChange }

    return <Pagination {...paginationProps} />
  }

  handlePageChange = clientCurrentPage => {
    const { collection } = this.state
    const { scrollToTop, clientPageLimit, dataName } = this.props

    const isForward = this.isForward(clientCurrentPage)
    const pageCollection = collection[clientCurrentPage] || []
    const clientPageCollection = pageCollection.filter(e => e)

    this.setState({ ...{ clientCurrentPage, isForward, clientPageCollection } })

    scrollToTop(dataName)

    const isCollectionFull = pageCollection.length === clientPageLimit

    !isCollectionFull && this.getNextCollectionData(clientCurrentPage)
  }

  getNextCollectionData (page) {
    const { responsePageLimit, clientPageLimit, getData } = this.props
    const { isForward } = this

    const isMultiplePages = responsePageLimit % clientPageLimit === 0
    const clientNextPage = !isMultiplePages && isForward(page) ? page : page - 1

    const responseNextPage = Math.floor(
      (clientNextPage * clientPageLimit) / responsePageLimit + 1
    )

    getData(responseNextPage)
  }

  isForward = page => {
    const { clientCurrentPage } = this.state

    return page > clientCurrentPage
  }

  clientPageCollectionData () {
    const { clientPageCollection } = this.state
    const {
      children,
      dataName,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading
    } = this.props

    const clientPageCollectionProps = {
      [dataName]: clientPageCollection,
      itemsPerRow,
      artistName,
      topTrackCount,
      isLoading
    }

    const clientPageCollectionData =
      clientPageCollection &&
      React.cloneElement(children, clientPageCollectionProps)

    return clientPageCollectionData
  }

  errorData () {
    const { error, getData, responseCurrentPage } = this.props

    const handleRefresh = () => getData(responseCurrentPage)
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  render () {
    const { error } = this.props
    const { clientPageCollection } = this.state

    const clientPageCollectionData =
      clientPageCollection && this.clientPageCollectionData()

    const errorData = error && this.errorData()

    const contentData = clientPageCollectionData || errorData

    return (
      <React.Fragment>
        <div>{contentData}</div>

        <div>
          <Divider />

          {this.paginationData()}
        </div>
      </React.Fragment>
    )
  }
}
