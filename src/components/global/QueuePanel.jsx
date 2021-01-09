import React from 'react'
import { Sidebar, Segment, Divider, Item, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Ticker from 'global/Ticker'
import TracksListContext from './queue/tracks/ListContext'

export default class QueuePanel extends React.PureComponent {
  contentData () {
    return (
      <div className="queuePanelContentWrap">
        {this.headerData()}

        <Divider />

        <TracksListContext />
      </div>
    )
  }

  headerData () {
    return (
      <Item.Group className="queuePanelHeaderWrap">
        <Item className="queuePanelHeader">
          {this.imageData()}
          <Item.Content className="queuePanelHeaderContent">
            {this.albumTitleData()}
            {this.artistNameData()}
            {this.releasedData()}
          </Item.Content>
          {this.sourceIconData()}
        </Item>
      </Item.Group>
    )
  }

  imageData () {
    const src = this.props.currentAlbum.images.medium

    return <Item.Image rounded className="queuePanelHeaderImage" {...{ src }} />
  }

  albumTitleData () {
    const { currentAlbum } = this.props

    const artistNameEncoded = encodeURIComponent(currentAlbum.artist)
    const albumTitleEncoded = encodeURIComponent(currentAlbum.title)
    const albumLink = `/artists/${artistNameEncoded}/albums/${albumTitleEncoded}`

    return (
      <Ticker key={uuid()}>
        <Item.Header as="h3">
          <Link to={albumLink}>{currentAlbum.title}</Link>
        </Item.Header>
      </Ticker>
    )
  }

  artistNameData () {
    const { currentAlbum } = this.props

    const artistNameEncoded = encodeURIComponent(currentAlbum.artist)
    const artistLink = `/artists/${artistNameEncoded}`

    return (
      <Ticker key={uuid()}>
        <Item.Description>
          <Link to={artistLink}>{currentAlbum.artist}</Link>
        </Item.Description>
      </Ticker>
    )
  }

  releasedData () {
    const { released } = this.props.currentAlbum

    return <Item.Meta>{released || '\u00A0'}</Item.Meta>
  }

  sourceIconData () {
    const { currentAlbum } = this.props

    return <Icon className="queuePanelHeaderIcon" name={currentAlbum.source} />
  }

  render () {
    const { currentAlbum, isQueuePanelVisible } = this.props

    const contentData = currentAlbum && this.contentData()

    return (
      <Sidebar
        className="queuePanel"
        direction="right"
        animation="overlay"
        as={Segment}
        visible={isQueuePanelVisible}
        content={contentData}
      />
    )
  }
}
