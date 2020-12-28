import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Divider, List } from 'semantic-ui-react'
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

    const listenersCount = album.listeners_count.toLocaleString('eu')
    const playsCount = album.plays_count.toLocaleString('eu')

    return (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
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
      track.artist = album.artist

      const trackProps = { key: uuid(), track, index, albumSource }

      return <TrackContext {...trackProps} />
    }
    const tracksList = tracks.map(trackData)

    return <List selection content={tracksList} />
  }

  render () {
    const { album, albumSource } = this.props

    const countersData = albumSource !== 'bandcamp' && this.countersData()

    const tracksData = album.tracks && this.tracksData()

    return (
      <div className="albumPageRightColumn">
        {this.headerData()}
        {this.tagsData()}
        {countersData}

        <Divider />

        {this.descriptionData()}

        <Divider />

        {tracksData}
      </div>
    )
  }
}
