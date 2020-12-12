import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Divider, List } from 'semantic-ui-react'
import TrackContext from 'global/player/TrackContext'
import { Link } from 'react-router-dom'
import Tags from 'global/Tags'

export default class Right extends React.PureComponent {
  render () {
    const { album } = this.props
    const { tags, description, tracks } = album

    const albumTitle = album.title
    const albumTitleData = <Header as="h2" content={albumTitle} />

    const artistName = album.artist
    const artistNameEncoded = encodeURIComponent(artistName)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistNameData = (
      <Header as="h3">
        <Link to={artistPageLink}>{artistName}</Link>
      </Header>
    )

    const headerData = (
      <div className="albumPageMainHeader">
        {albumTitleData}
        {artistNameData}
      </div>
    )

    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const tagsPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}/tags`
    const tagsProps = { tags, viewMore: true, link: tagsPageLink }

    const listenersCount = album.listeners_count.toLocaleString('eu')
    const playsCount = album.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const descriptionData = (
      <div className="albumPageDescription">
        {description || 'No description.'}
      </div>
    )

    const trackData = (track, index) => {
      const trackProps = { track, artistName, index }

      return <TrackContext key={uuid()} {...trackProps} />
    }
    const tracksList = tracks.map(trackData)
    const tracksData = tracks && <List selection content={tracksList} />

    return (
      <div className="albumPageRightColumn">
        {headerData}
        <Tags {...tagsProps} />
        {countersData}

        <Divider />

        {descriptionData}

        <Divider />

        {tracksData}
      </div>
    )
  }
}
