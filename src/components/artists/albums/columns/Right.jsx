import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Divider, List } from 'semantic-ui-react'
import { HashRouter as Router, Link } from 'react-router-dom'
import Track from 'global/artists/Track'

export default class Right extends React.PureComponent {
  render () {
    const { info, params } = this.props
    const { tags, description, tracks } = info

    const albumTitle = info.title
    const albumTitleData = (
      <Header as="h2" className="albumPageAlbumTitle" content={albumTitle} />
    )

    const artistPageLink = `/artists/${params.artistName}`
    const artistName = info.artist
    const artistNameData = (
      <Header className="albumPageArtistName">
        <Link to={artistPageLink}>{artistName}</Link>
      </Header>
    )

    const listenersCount = info.listeners_count.toLocaleString('eu')
    const playsCount = info.plays_count.toLocaleString('eu')
    const countersData = (
      <Label.Group size="large">
        <Label basic icon="user" content={listenersCount} />
        <Label basic icon="music" content={playsCount} />
      </Label.Group>
    )

    const tagData = tag => (
      <Label key={uuid()} as={Link} to={`/tags/${tag}`} content={tag} />
    )
    const tagsList = tags.map(tagData)
    const tagsData = (
      <Router>
        <Label.Group size="large">
          {tagsList}

          {tags.length > 0 && <Label as="a" content="..." />}
        </Label.Group>
      </Router>
    )

    const descriptionData = (
      <div className="albumPageDescription">
        {description || 'No description.'}
      </div>
    )

    const trackData = (track, index) => (
      <Track key={uuid()} index={index} {...{ track, artistName }} />
    )
    const tracksList = tracks.map(trackData)
    const tracksData = tracks && (
      <Router>
        <List selection content={tracksList} />
      </Router>
    )

    return (
      <div className="albumPageRightColumn">
        {albumTitleData}

        {artistNameData}

        {countersData}

        {tagsData}

        <Divider />

        {descriptionData}

        <Divider />

        {tracksData}
      </div>
    )
  }
}
