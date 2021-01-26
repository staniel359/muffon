import React from 'react'
import { Segment } from 'semantic-ui-react'
import LoaderDimmer from 'global/LoaderDimmer'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const pageData = () => {
    const { isLoaded, isLoading, error } = this.state

    if (isLoaded) {
      return segmentData()
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

  const segmentData = () => {
    const { isLoading } = this.state

    return (
      <Segment
        className="pageSegment"
        loading={isLoading}
        content={segmentContentData()}
      />
    )
  }

  const segmentContentData = () => {
    const { error, data } = this.state

    if (error) {
      return errorData()
    } else {
      if (data) {
        return this.contentData()
      }
    }
  }

  const errorData = () => {
    const { error } = this.state

    const handleRefresh = () => this.getData()
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  return <React.Fragment>{pageData()}</React.Fragment>
}
