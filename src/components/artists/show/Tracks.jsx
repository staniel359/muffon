import React from 'react'
import Track from './tracks/Track'
import { v4 as uuid } from 'uuid'
import { List, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'

export default class Tracks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  limit = 10

  componentDidMount () {
    this.getTracks()
  }

  getTracks () {
    axios(this.tracksLink()).then(resp => this.setTracks(resp))
  }

  tracksLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}/tracks`,
      params: { limit: this.limit }
    }
  }

  setTracks (resp) {
    this.setState({ tracks: resp.data.artist.tracks })
  }

  tracksList () {
    return (
      <List selection>
        {this.state.tracks.map(track => {
          return <Track key={uuid()} track={track} />
        })}
      </List>
    )
  }

  render () {
    return (
      <React.Fragment>
        <Header as="h4" attached="top" content="Top tracks" />

        <Segment
          className="artistPageSegment"
          loading={!this.state.tracks}
          attached="bottom"
          content={this.state.tracks && this.tracksList()}
        />
      </React.Fragment>
    )
  }
}
