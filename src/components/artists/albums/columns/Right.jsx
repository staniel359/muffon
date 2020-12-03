import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Divider, List } from 'semantic-ui-react'
import TrackContextWrap from 'global/artists/TrackContextWrap'
import { Link } from 'react-router-dom'

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

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsListData = tags.map(tagData)
    const albumTitleEncoded = encodeURIComponent(albumTitle)
    const tagsPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}/tags`
    const tagsViewMoreData = tags.length > 0 && (
      <Label as={Link} to={tagsPageLink} content="..." />
    )
    const tagsData = (
      <Label.Group size="large">
        {tagsListData}
        {tagsViewMoreData}
      </Label.Group>
    )

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

      return <TrackContextWrap key={uuid()} {...trackProps} />
    }
    const tracksList = tracks.map(trackData)
    const tracksData = tracks && <List selection content={tracksList} />

    return (
      <div className="albumPageRightColumn">
        {headerData}
        {tagsData}
        {countersData}

        <Divider />

        {descriptionData}

        <Divider />

        {tracksData}
      </div>
    )
  }
}
