import React from 'react'
import { Segment, Image, Header } from 'semantic-ui-react'
import TrackPlayerPanelContext from 'global/player/TrackPlayerPanelContext'
import { Link } from 'react-router-dom'

export default class Main extends React.PureComponent {
  imageData () {
    const { images } = this.props.track

    const image = images.small

    return <Image wrapped className="trackPageCardImage" src={image} />
  }

  contentData () {
    const { track } = this.props

    const playerProps = { track }
    const playerData = <TrackPlayerPanelContext {...playerProps} />

    return (
      <Segment className="trackPageCardContentWrap">
        {this.infoData()}
        {playerData}
      </Segment>
    )
  }

  infoData () {
    const { track } = this.props

    const artistName = track.artist.name
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`

    const albumTitle = track.album.title
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    return (
      <div className="trackPageCardContent">
        <Header as="h3" content={track.title} />

        <Header as="h4">
          <Link to={artistPageLink}>{artistName}</Link>
        </Header>

        <Link to={albumPageLink}>{albumTitle}</Link>
      </div>
    )
  }

  render () {
    return (
      <Segment.Group horizontal className="trackPageCard">
        {this.imageData()}
        {this.contentData()}
      </Segment.Group>
    )
  }
}
