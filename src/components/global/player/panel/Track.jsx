import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Icon } from 'semantic-ui-react'
import ArtistImage from 'global/artists/Image'
import Ticker from 'global/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  contentData () {
    return (
      <Item.Group>
        <Item className="playerPanelTrack">
          {this.imageData()}
          <Item.Content className="playerPanelTrackContent">
            {this.trackTitleData()}
            {this.artistNameData()}
          </Item.Content>
          {this.iconData()}
        </Item>
      </Item.Group>
    )
  }

  imageData () {
    const { currentTrack } = this.props

    return (
      <div className="playerPanelTrackImageWrap">
        <ArtistImage
          circular
          size="extrasmall"
          artistName={currentTrack.artist.name}
        />
      </div>
    )
  }

  trackTitleData () {
    const { currentTrack } = this.props

    const artistNameEncoded = encodeURIComponent(currentTrack.artist.name)
    const trackTitleEncoded = encodeURIComponent(currentTrack.title)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    return (
      <Ticker key={uuid()}>
        <Item.Header as="h4">
          <Link to={trackLink}>{currentTrack.title}</Link>
        </Item.Header>
      </Ticker>
    )
  }

  artistNameData () {
    const { currentTrack } = this.props

    const artistNameEncoded = encodeURIComponent(currentTrack.artist.name)
    const artistLink = `/artists/${artistNameEncoded}`

    return (
      <Ticker key={uuid()}>
        <Item.Description>
          <Link to={artistLink}>{currentTrack.artist.name}</Link>
        </Item.Description>
      </Ticker>
    )
  }

  iconData () {
    const { currentTrackSource } = this.props

    return <Icon className="playerPanelTrackIcon" name={currentTrackSource} />
  }

  render () {
    const { currentTrack } = this.props

    const contentData = currentTrack && this.contentData()

    return <React.Fragment>{contentData}</React.Fragment>
  }
}
