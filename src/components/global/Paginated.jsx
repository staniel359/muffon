import React from 'react'
import { Divider } from 'semantic-ui-react'
import merge from 'deepmerge'
import Pagination from './paginated/Pagination'
import List from './paginated/List'

export default class Paginated extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { clientCurrentPage: 1, collection: {}, isForward: true }
  }

  componentDidMount = () => this.setData()

  componentDidUpdate (prevProps, prevState) {
    this.handleResponseCurrentPageChange(prevProps)
    this.handleCollectionChange(prevProps)
  }

  handleResponseCurrentPageChange (prevProps) {
    const { responseCurrentPage } = this.props

    const isPageChanged = responseCurrentPage !== prevProps.responseCurrentPage

    isPageChanged && this.setData()
  }

  handleCollectionChange (prevProps) {
    const { scrollToTop, collectionName, collection } = this.props

    const isCollectionChanged = collection !== prevProps.collection

    isCollectionChanged && scrollToTop(collectionName)
  }

  setData () {
    const { isForward } = this.state
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
  }

  newCollection () {
    const {
      responsePageLimit,
      responseCurrentPage,
      clientPageLimit
    } = this.props

    const totalOffset = responsePageLimit * (responseCurrentPage - 1)
    const startPage = Math.floor(totalOffset / clientPageLimit) + 1

    const collection = [...this.props.collection]
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

  render () {
    const { clientCurrentPage, collection } = this.state
    const {
      responseTotalPages,
      responsePageLimit,
      clientPageLimit,
      loading,
      getData,
      collectionName,
      itemsPerRow,
      collectionList
    } = this.props

    const listProps = {
      collectionName,
      itemsPerRow,
      collectionList,
      collection,
      clientCurrentPage
    }

    const setClientCurrentPage = clientCurrentPage =>
      this.setState({ ...{ clientCurrentPage } })
    const setForward = isForward => this.setState({ ...{ isForward } })
    const scrollToTop = () => this.props.scrollToTop(collectionName)

    const paginationProps = {
      responseTotalPages,
      responsePageLimit,
      clientPageLimit,
      loading,
      clientCurrentPage,
      getData,
      collection,
      setClientCurrentPage,
      setForward,
      scrollToTop
    }

    return (
      <React.Fragment>
        <List {...listProps} />

        <Divider />

        <Pagination {...paginationProps} />
      </React.Fragment>
    )
  }
}
