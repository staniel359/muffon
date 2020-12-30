import React from 'react'
import { Link } from 'react-router-dom'
import { List, Image } from 'semantic-ui-react'
import ArtistImage from 'global/artists/Image'
import Ticker from 'global/Ticker'
import { v4 as uuid } from 'uuid'

export default class Track extends React.PureComponent {
  render () {
    const {
      currentTrack,
      currentTrackSource,
      currentTrackIsFromAlbum
    } = this.props

    const albumImageData = () => {
      return (
        <Image
          rounded
          wrapped
          className="imageWrapBordered"
          src={currentTrack.images.small}
        />
      )
    }

    const artistImageData = () => {
      return (
        <ArtistImage
          circular
          size="extrasmall"
          artistName={currentTrack.artist}
        />
      )
    }

    const imageData = (
      <div className="playerPanelTrackImage">
        {currentTrackIsFromAlbum ? albumImageData() : artistImageData()}
      </div>
    )

    const artistNameEncoded = encodeURIComponent(currentTrack.artist)
    const trackTitleEncoded = encodeURIComponent(currentTrack.title)
    const trackLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`
    const trackTitleTickerData = (
      <Ticker key={uuid()}>
        <List.Header as="h4">
          <Link to={trackLink}>{currentTrack.title}</Link>
        </List.Header>
      </Ticker>
    )

    const artistLink = `/artists/${artistNameEncoded}`
    const artistNameTickerData = (
      <Ticker key={uuid()}>
        <List.Description>
          <Link to={artistLink}>{currentTrack.artist}</Link>
        </List.Description>
      </Ticker>
    )

    const albumTitleEncoded = encodeURIComponent(currentTrack.album)
    const albumLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`
    const albumTitleTickerData = currentTrackIsFromAlbum && (
      <Ticker key={uuid()}>
        <List.Description>
          <Link to={albumLink}>{currentTrack.album}</Link>
        </List.Description>
      </Ticker>
    )

    const trackData = (
      <List.Content className="playerPanelTrackContent">
        {trackTitleTickerData}
        {artistNameTickerData}
        {albumTitleTickerData}
      </List.Content>
    )

    const iconData = (
      <List.Icon className="playerPanelTrackIcon" name={currentTrackSource} />
    )

    return (
      <List>
        <List.Item className="playerPanelTrack">
          {imageData}
          {trackData}
          {iconData}
        </List.Item>
      </List>
    )
  }
}
