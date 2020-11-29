import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Divider, List } from 'semantic-ui-react'
import TrackContextWrap from 'global/artists/TrackContextWrap'
import { Link } from 'react-router-dom'

export default class Right extends React.PureComponent {
  render () {
    const { info, params } = this.props
    const { tags, description, tracks } = info

    const albumTitle = info.title
    const albumTitleData = (
      <Header as="h1" className="albumPageAlbumTitle" content={albumTitle} />
    )

    const artistPageLink = `/artists/${params.artistName}`
    const artistName = info.artist
    const artistNameData = (
      <Header as="h3" className="albumPageArtistName">
        <Link to={artistPageLink}>{artistName}</Link>
      </Header>
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsListData = tags.map(tagData)
    const tagsViewMoreData = info.tags.length > 0 && (
      <Label as="a" content="..." />
    )
    const tagsData = (
      <Label.Group size="large">
        {tagsListData}
        {tagsViewMoreData}
      </Label.Group>
    )

    const listenersCount = info.listeners_count.toLocaleString('eu')
    const playsCount = info.plays_count.toLocaleString('eu')
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
        {albumTitleData}
        {artistNameData}
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
