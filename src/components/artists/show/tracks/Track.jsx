import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'

export default class Track extends React.Component {
  playButton () {
    return (
      <PlayButton
        artistName={this.props.artistName}
        trackTitle={this.props.track.title}
      />
    )
  }

  trackLink () {
    return `/artists/${this.artistName}/tracks/${this.trackTitle}`
  }

  artistName = encodeURIComponent(this.props.artistName)
  trackTitle = encodeURIComponent(this.props.track.title)

  trackCounter () {
    return (
      <div className="artistPageTrackCounter">
        <div
          className="inner trackLine"
          style={{ width: this.trackLineWidth }}
        />
        <div className="inner">
          <Icon name="user" />
          {this.listenersCount.toLocaleString('eu')}
        </div>
      </div>
    )
  }

  listenersCount = this.props.track.listeners_count
  topTrackCount = this.props.topTrackCount
  trackLineWidth = `${(this.listenersCount / this.topTrackCount) * 70}%`

  render () {
    return (
      <List.Item>
        <List.Icon verticalAlign="middle">{this.playButton()}</List.Icon>

        <List.Content as={Link} to={this.trackLink()}>
          <List.Header as="h4" content={this.props.track.title} />
          <List.Description content={this.trackCounter()} />
        </List.Content>
      </List.Item>
    )
  }
}
