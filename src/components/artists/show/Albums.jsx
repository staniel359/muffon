import React from 'react'
import Album from './albums/Album'
import { v4 as uuid } from 'uuid'
import { Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'

export default class Albums extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  limit = 4

  componentDidMount () {
    this.getAlbums()
  }

  getAlbums () {
    axios(this.albumsLink()).then(resp => this.setAlbums(resp))
  }

  albumsLink () {
    return {
      method: 'GET',
      url: `/lastfm/artists/${this.props.artistName}/albums`,
      params: { limit: this.limit }
    }
  }

  setAlbums (resp) {
    this.setState({ albums: resp.data.artist.albums })
  }

  albumsList () {
    return (
      <Grid>
        {this.state.albums.map(album => {
          return (
            <Grid.Column width={8} key={uuid()}>
              <Album album={album} />
            </Grid.Column>
          )
        })}
      </Grid>
    )
  }

  render () {
    return (
      <React.Fragment>
        <Header as="h4" attached="top" content="Top albums" />
        <Segment
          className="artistPageSegment"
          loading={!this.state.albums}
          attached="bottom"
          content={this.state.albums && this.albumsList()}
        />
      </React.Fragment>
    )
  }
}
