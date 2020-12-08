import React from 'react'
import Paginated from 'global/Paginated'

export default function paginatedData () {
  const {
    error,
    data,
    responseTotalPages,
    responseCurrentPage,
    isLoading,
    topTrackCount
  } = this.state
  const {
    getData,
    dataName,
    itemsPerRow,
    clientPageLimit,
    responsePageLimit
  } = this

  const artistName = this.state.artistName || this.props.artistName
  const scrollToTop = () => {
    const { scrollToTop } = this.props

    scrollToTop ? scrollToTop(this.dataName) : window.scrollTo(0, 0)
  }

  const paginatedProps = {
    error,
    responseCurrentPage,
    responseTotalPages,
    scrollToTop,
    getData,
    dataName,
    data,
    itemsPerRow,
    clientPageLimit,
    responsePageLimit,
    isLoading,
    artistName,
    topTrackCount
  }

  return <Paginated {...paginatedProps}>{this.dataList}</Paginated>
}
