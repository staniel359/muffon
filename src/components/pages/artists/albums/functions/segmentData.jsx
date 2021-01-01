import React from 'react'
import { Segment, Label } from 'semantic-ui-react'
import ErrorMessage from 'global/ErrorMessage'

export default function segmentData () {
  const { isLoading, data, error, albumSource } = this.state

  const isLabelShown = albumSource && albumSource !== 'lastfm'
  const albumSourceLabelData = isLabelShown && (
    <Label
      corner
      size="big"
      icon={albumSource}
      className={`${albumSource}Label`}
    />
  )

  const contentData = data && this.contentData()

  const handleRefresh = () => {
    const { request } = this.state

    if (request.source === 'bandcamp') {
      this.getBandcampAlbumData(request.link)
    } else {
      this.getData()
    }
  }
  const errorDataProps = { error, handleRefresh }
  const errorData = error && <ErrorMessage {...errorDataProps} />

  const segmentData = contentData || errorData

  return (
    <Segment className="pageSegment" loading={isLoading}>
      {albumSourceLabelData}
      {segmentData}
    </Segment>
  )
}
