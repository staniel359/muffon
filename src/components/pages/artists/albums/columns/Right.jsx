import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Label, Icon, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Tags from 'global/Tags'
import TracksListContext from '../tracks/ListContext'

export default class Right extends React.PureComponent {
  headerData () {
    const { album } = this.props

    const albumTitleData = <Header as="h2" content={album.title} />

    const artistNameEncoded = encodeURIComponent(album.artist.name)
    const artistPageLink = `/artists/${artistNameEncoded}`
    const artistNameData = (
      <Header as="h3">
        <Link to={artistPageLink}>{album.artist.name}</Link>
      </Header>
    )

    return (
      <div className="albumPageMainHeader">
        {albumTitleData}
        {artistNameData}
      </div>
    )
  }

  releasedLabelsData () {
    const { album } = this.props

    const releasedData = album.released && this.releasedData()
    const labelsData = album.labels && this.labelsData()

    return (
      <Label.Group>
        {releasedData}
        {labelsData}
      </Label.Group>
    )
  }

  releasedData () {
    const { released } = this.props.album

    return <Label basic size="large" content={released} />
  }

  labelsData () {
    const { labels } = this.props.album

    const labelData = label => {
      return (
        <Label
          basic
          icon="dot circle"
          size="large"
          key={uuid()}
          content={label}
        />
      )
    }

    return labels.map(labelData)
  }

  tagsData () {
    const { album, requestData } = this.props

    const artistNameEncoded = encodeURIComponent(album.artist.name)
    const albumTitleEncoded = encodeURIComponent(album.title)
    const tagsPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}/tags`
    const tagsPageLinkData = { pathname: tagsPageLink, requestData }
    const tagsProps = {
      tags: album.tags,
      viewMore: true,
      link: tagsPageLinkData
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
    const { album, requestData } = this.props

    const artistNameEncoded = encodeURIComponent(album.artist.name)
    const albumTitleEncoded = encodeURIComponent(album.title)
    const descriptionPageLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}/description`
    const descriptionPageLinkData = {
      pathname: descriptionPageLink,
      requestData
    }

    return (
      <React.Fragment>
        <Divider />

        <div>
          {album.description}
          {'\u00A0'}
          <Link to={descriptionPageLinkData}>Read more...</Link>
        </div>
      </React.Fragment>
    )
  }

  tracksData () {
    const { album } = this.props

    const tracksListProps = { album }

    return <TracksListContext {...tracksListProps} />
  }

  render () {
    const { album } = this.props

    const tagsData = album.tags && this.tagsData()

    const descriptionData = album.description && this.descriptionData()

    const tracksData = album.tracks && this.tracksData()

    return (
      <div className="albumPageRightColumn">
        {this.headerData()}
        {this.releasedLabelsData()}
        {tagsData}
        {this.countersData()}
        {descriptionData}

        <Divider />

        {tracksData}
      </div>
    )
  }
}
