import React from 'react'
import LoaderDimmer from 'global/LoaderDimmer'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const { isLoaded, requestData, error } = this.state

  const loaderData = !isLoaded && <LoaderDimmer />

  const segmentData = requestData && this.segmentData()

  const handleRefresh = () => {
    this.setState({ isLoaded: false })
    this.getData()
  }
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const pageData = loaderData || segmentData || errorData

  return <React.Fragment>{pageData}</React.Fragment>
}
