import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Icon, Divider, List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'
import { Link } from 'react-router-dom'
import Tags from 'global/Tags'

export default class Right extends React.PureComponent {
  headerData () {
    const { album } = this.props

    const albumTitleData = <Header as="h2" content={album.title} />

    const artistNameEncoded = encodeURIComponent(album.artist)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistNameData = (
      <Header as="h3">
        <Link to={artistPageLink}>{album.artist}</Link>
      </Header>
    )

    return (
      <div className="albumPageMainHeader">
        {albumTitleData}
        {artistNameData}
      </div>
    )
  }

  releasedData () {
    const { released } = this.props.album

    return (
      <Label.Group>
        <Label basic size="large" content={released} />
      </Label.Group>
    )
  }

  tagsData () {
    const { album, albumSource } = this.props
    const { tags } = album

    const artistNameEncoded = encodeURIComponent(album.artist)
    const albumTitleEncoded = encodeURIComponent(album.title)
    const tagsPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}/tags`
    const tagsProps = {
      tags,
      viewMore: true,
      link: tagsPageLink,
      albumSource,
      albumLink: album.bandcamp_link
    }

    return <Tags {...tagsProps} />
  }

  countersData () {
    const { album } = this.props

    const listenersCountData = album.listeners_count > 0 && (
      <Label basic>
        <Icon name="user" />
        {album.listeners_count.toLocaleString('eu')}
      </Label>
    )

    const playsCountData = album.plays_count > 0 && (
      <Label basic>
        <Icon name="music" />
        {album.plays_count.toLocaleString('eu')}
      </Label>
    )

    return (
      <Label.Group size="large">
        {listenersCountData}
        {playsCountData}
      </Label.Group>
    )
  }

  descriptionData () {
    const { description } = this.props.album

    return (
      <div className="pageDescription">{description || 'No description.'}</div>
    )
  }

  tracksData () {
    const { album, albumSource } = this.props
    const { tracks } = album

    const trackData = (track, index) => {
      track.artist = track.artist || album.artist

      const isWithArtist = track.artist !== album.artist
      const trackProps = {
        key: uuid(),
        track,
        index,
        albumSource,
        isWithArtist
      }

      return <TrackContext {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    return <List selection content={tracksList} />
  }

  render () {
    const { album } = this.props

    const releasedData = album.released && this.releasedData()

    const tagsData = album.tags && this.tagsData()

    const tracksData = album.tracks && this.tracksData()

    return (
      <div className="albumPageRightColumn">
        {this.headerData()}
        {releasedData}
        {tagsData}
        {this.countersData()}

        <Divider />

        {this.descriptionData()}

        <Divider />

        {tracksData}
      </div>
    )
  }
}
