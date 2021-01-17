import React from 'react'
import LoaderDimmer from 'global/LoaderDimmer'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const errorData = () => {
    const { error } = this.state

    const handleRefresh = () => this.getData()
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  const pageData = () => {
    const { isLoaded, isLoading, error } = this.state

    if (isLoaded) {
      return this.contentData()
    } else {
      if (isLoading) {
        return <LoaderDimmer />
      } else {
        if (error) {
          return errorData()
        }
      }
    }
  }

  return <React.Fragment>{pageData()}</React.Fragment>
}
