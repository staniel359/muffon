import React from 'react'
import LoaderDimmer from 'global/LoaderDimmer'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const { isLoaded, isAlbumPresent, error } = this.state

  const loaderData = !isLoaded && <LoaderDimmer />

  const segmentData = isAlbumPresent && this.segmentData()

  const handleRefresh = () => {
    this.setState({ isLoaded: false })
    this.getData()
  }
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const pageData = loaderData || segmentData || errorData

  return <React.Fragment>{pageData}</React.Fragment>
}
