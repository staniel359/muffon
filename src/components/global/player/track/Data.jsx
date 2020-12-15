import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import formatSeconds from 'global/functions/formatSeconds'

export default class Data extends React.PureComponent {
  indexData () {
    const { index } = this.props

    return <div className="trackContentIndex">{`${index + 1}.`}</div>
  }

  titleData () {
    const { track } = this.props

    const artistNameEncoded = encodeURIComponent(track.artist)
    const trackTitleEncoded = encodeURIComponent(track.title)
    const trackPageLink = `/artists/${artistNameEncoded}/tracks/${trackTitleEncoded}`

    return (
      <List.Header as="h4">
        <Link
          className="trackContentLink"
          to={trackPageLink}
          onClick={this.handleLinkClick}
        >
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

    const artistNameEncoded = encodeURIComponent(track.artist)
    const artistPageLink = `/artists/${artistNameEncoded}`

    return (
      <List.Description>
        <Link
          className="trackContentLink"
          to={artistPageLink}
          onClick={this.handleLinkClick}
        >
          {track.artist}
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
          <Icon name="user" size="small" />
          {trackCounterData}
        </div>
      </List.Description>
    )
  }

  render () {
    const { index, isWithArtist, track } = this.props

    const indexData = index >= 0 && this.indexData()

    const titleData = this.titleData()

    const artistData = isWithArtist && this.artistData()

    const lengthData = track.length >= 0 && this.lengthData()

    const counterData = track.listeners_count >= 0 && this.counterData()

    return (
      <List.Content className="trackContent">
        <div className="trackContentMain">
          <div className="trackContentIndexLink">
            {indexData}
            <div>
              {titleData}
              {artistData}
            </div>
          </div>
          {lengthData}
        </div>
        {counterData}
      </List.Content>
    )
  }
}
