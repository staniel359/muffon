import React from 'react'
import { Segment } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function segmentData () {
  const { isLoading, data, error } = this.state

  const contentData = data && this.contentData()

  const handleRefresh = () => this.getData()
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const segmentData = contentData || errorData

  return (
    <Segment
      className="pageSegment"
      loading={isLoading}
      content={segmentData}
    />
  )
}
