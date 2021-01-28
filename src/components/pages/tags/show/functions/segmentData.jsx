import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function segmentData () {
  const headerContentData = () => {
    const { tagName } = this.props

    const tagNameEncoded = encodeURIComponent(tagName)
    const pageLink = `/tags/${tagNameEncoded}/${this.dataName}`

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
    const { isLoading, error } = this.state

    const isInfoSegment = this.dataName === 'info'
    const isMain = isInfoSegment && !error
    const classNames = ['tagPageSegment', isMain && 'Main']
    const className = classNames.filter(Boolean).join('')

    return (
      <Segment
        content={segmentContentData()}
        loading={isLoading}
        {...{ className }}
      />
    )
  }

  return (
    <Segment.Group className="tagPageSegmentWrap">
      {headerData}
      {segmentData()}
    </Segment.Group>
  )
}
