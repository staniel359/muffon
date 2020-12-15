import React from 'react'
import { Segment, Divider } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function segmentData () {
  const { error, isLoading, isLoaded, data } = this.state

  const headerData = this.headerData()

  const contentData = data && this.contentData()

  const handleRefresh = this.getData
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const segmentData = isLoaded && (contentData || errorData)

  return (
    <div className="trackPageSegment">
      <div className="trackPageSegmentHeader">{headerData}</div>

      <Divider />

      <Segment
        className="trackPageSegmentContent"
        content={segmentData}
        loading={isLoading}
      />
    </div>
  )
}
