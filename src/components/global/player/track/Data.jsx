import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { camelCase } from 'camel-case'
import formatSeconds from 'global/functions/formatSeconds'

export default class Data extends React.PureComponent {
  imageData () {
    const { image } = this.props.track.album

    return <Image rounded className="trackContentImage" src={image} />
  }

  indexData () {
    const { index } = this.props

    return <div className="trackContentIndex">{`${index + 1}.`}</div>
  }

  titleData () {
    const { track } = this.props

    const artistNameEncoded = encodeURIComponent(track.artist.name)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const trackPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    return (
      <List.Header as="h4">
        <Link to={trackPageLink} onClick={this.handleLinkClick}>
          {track.title}
        </Link>
      </List.Header>
    )
  }

  handleLinkClick = event => {
    const { hideSearch } = this.props

    event.stopPropagation()

    hideSearch && hideSearch()
  }

  artistData () {
    const { track } = this.props

    const artistNameEncoded = encodeURIComponent(track.artist.name)
    const artistPageLink = `/artists/${artistNameEncoded}`

    return (
      <List.Description>
        <Link to={artistPageLink} onClick={this.handleLinkClick}>
          {track.artist.name}
        </Link>
      </List.Description>
    )
  }

  albumData () {
    const { album } = this.props.track

    const artistNameEncoded = encodeURIComponent(album.artist.name)
    const albumTitleEncoded = encodeURIComponent(album.title)
    const albumPageLink =
      `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    return (
      <List.Description>
        <Link to={albumPageLink} onClick={this.handleLinkClick}>
          {album.title}
        </Link>
      </List.Description>
    )
  }

  lengthData () {
    const { length } = this.props.track

    return (
      <List.Description
        className="trackContentLength"
        content={formatSeconds(length)}
      />
    )
  }

  iconData () {
    const { audio } = this.props.track

    const isAudioPresent = audio && audio.present
    const classNames = [
      'trackSourceIcon',
      isAudioPresent && camelCase(audio.source)
    ]
    const className = classNames.filter(Boolean).join(' ')

    return <List.Icon {...{ className }} />
  }

  counterData () {
    const { track, topTrackCount } = this.props

    const listenersCount = track.listeners_count
    const trackLineWidth = `${(listenersCount / topTrackCount) * 70}%`
    const trackLineStyle = { width: trackLineWidth }

    const trackCounterData = listenersCount.toLocaleString('eu')

    return (
      <List.Description className="trackContentCounter">
        <div className="trackContentCounterLine" style={trackLineStyle} />
        <div className="trackContentCounterData">
          <List.Icon name="user" size="small" />
          {trackCounterData}
        </div>
      </List.Description>
    )
  }

  render () {
    const { isWithAlbumImage, index, isWithArtist, isWithAlbum, track } = this.props

    const imageData = isWithAlbumImage && track.album && this.imageData()

    const indexData = index >= 0 && this.indexData()

    const titleData = this.titleData()

    const artistData = isWithArtist && this.artistData()

    const albumData = isWithAlbum && track.album && this.albumData()

    const lengthData = track.length >= 0 && this.lengthData()

    const iconData = track.audio && this.iconData()

    const counterData = track.listeners_count >= 0 && this.counterData()

    return (
      <List.Content className="trackContentWrap">
        <div className="trackContent">
          <div className="trackContentMain">
            {imageData}
            {indexData}
            <div>
              {titleData}
              {artistData}
              {albumData}
            </div>
          </div>
          <div className="trackContentExtra">
            {lengthData}
            {iconData}
          </div>
        </div>
        {counterData}
      </List.Content>
    )
  }
}
