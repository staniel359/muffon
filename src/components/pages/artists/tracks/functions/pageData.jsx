import React from 'react'
import LoaderDimmer from 'global/LoaderDimmer'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const { isLoaded, data, error } = this.state

  const loaderData = !isLoaded && <LoaderDimmer />

  const contentData = data && this.contentData()

  const handleRefresh = () => {
    this.setState({ isLoaded: false })
    this.getData()
  }
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const pageData = loaderData || contentData || errorData

  return pageData
}
