import React from 'react'
import { Segment } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function pageData () {
  const { error, isLoading, isLoaded, data } = this.state

  const isInfoSegment = this.dataName === 'info'
  const headerData = !isInfoSegment && <Segment content={this.headerData()} />

  const segmentClassName = () => {
    if (isInfoSegment && !error) {
      return 'tagPageSegmentMain'
    } else {
      return 'tagPageSegment'
    }
  }

  const contentData = data && this.contentData()

  const handleRefresh = this.getData
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const segmentData = isLoaded && (contentData || errorData)

  return (
    <Segment.Group className="tagPageSegmentWrap">
      {headerData}
      <Segment
        className={segmentClassName()}
        content={segmentData}
        loading={isLoading}
      />
    </Segment.Group>
  )
}
