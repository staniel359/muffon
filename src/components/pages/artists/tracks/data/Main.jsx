import React from 'react'
import { Segment, Image, Header } from 'semantic-ui-react'
import PlayerPanelContext from 'global/player/track/PlayerPanelContext'
import { Link } from 'react-router-dom'

export default class Main extends React.PureComponent {
  render () {
    const { track } = this.props

    const image = track.images.small
    const imageData = (
      <Image wrapped className="trackPageCardImage" src={image} />
    )

    const trackTitleData = <Header as="h3" content={track.title} />

    const artistName = track.artist
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistPageLinkData = <Link to={artistPageLink}>{artistName}</Link>
    const artistNameData = <Header as="h4" content={artistPageLinkData} />

    const albumTitle = track.album
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const albumPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`
    const albumTitleData = <Link to={albumPageLink}>{albumTitle}</Link>

    const infoData = (
      <div className="trackPageCardContent">
        {trackTitleData}
        {artistNameData}
        {albumTitleData}
      </div>
    )

    const playerProps = { track }
    const playerData = <PlayerPanelContext {...playerProps} />

    const contentData = (
      <Segment className="trackPageCardContentWrap">
        {infoData}
        {playerData}
      </Segment>
    )

    return (
      <Segment.Group horizontal className="trackPageCard">
        {imageData}
        {contentData}
      </Segment.Group>
    )
  }
}
