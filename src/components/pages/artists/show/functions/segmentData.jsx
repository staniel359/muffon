import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function segmentData () {
  const headerContentData = () => {
    const { artistName } = this.props

    const artistNameEncoded = encodeURIComponent(artistName)
    const pageLink = `/artists/${artistNameEncoded}/${this.dataName}`

    return (
      <Header as="h3">
        <Link to={pageLink}>{this.headerText}</Link>
      </Header>
    )
  }

  const headerData = this.headerText && (
    <Segment content={headerContentData()} />
  )

  const errorData = () => {
    const { error } = this.state

    const handleRefresh = () => this.getData()
    const errorDataProps = { error, handleRefresh }

    return <ErrorMessage {...errorDataProps} />
  }

  const segmentContentData = () => {
    const { isLoaded, error } = this.state

    if (isLoaded) {
      return this.contentData()
    } else {
      if (error) {
        return errorData()
      }
    }
  }

  const segmentData = () => {
    const { isLoading } = this.state

    return (
      <Segment
        className="artistPageSegmentContent"
        loading={isLoading}
        content={segmentContentData()}
      />
    )
  }

  return (
    <Segment.Group className="artistPageSegment">
      {headerData}
      {segmentData()}
    </Segment.Group>
  )
}
