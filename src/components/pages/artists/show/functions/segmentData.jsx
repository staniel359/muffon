import React from 'react'
import { Segment } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const { isLoading, isLoaded, data, error } = this.state

  const headerData = this.dataName !== 'info' && (
    <Segment content={this.headerData()} />
  )

  const contentData = data && this.contentData()

  const handleRefresh = this.getData
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const segmentData = isLoaded && (contentData || errorData)

  return (
    <Segment.Group className="artistPageSegmentWrap">
      {headerData}
      <Segment
        className="artistPageSegment"
        content={segmentData}
        loading={isLoading}
      />
    </Segment.Group>
  )
}
