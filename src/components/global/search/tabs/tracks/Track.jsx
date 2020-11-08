import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlayButton from 'global/player/buttons/Play'

export default class Track extends React.Component {
  trackLink () {
    return `/artists/${this.artistName}/tracks/${this.trackTitle}`
  }

  artistName = encodeURIComponent(this.props.track.artist)
  trackTitle = encodeURIComponent(this.props.track.title)

  playButton () {
    return (
      <PlayButton
        artistName={this.props.track.artist}
        trackTitle={this.props.track.title}
        trackId={this.props.track.id}
      />
    )
  }

  render () {
    return (
      <List.Item>
        <List.Icon className="searchItemIcon" verticalAlign="middle">
          {this.playButton()}
        </List.Icon>

        <List.Content
          as={Link}
          to={this.trackLink()}
          onClick={this.props.hideSearch}
        >
          <List.Header as="h4" content={this.props.track.title} />
          <List.Description content={this.props.track.artist} />
        </List.Content>
      </List.Item>
    )
  }
}
