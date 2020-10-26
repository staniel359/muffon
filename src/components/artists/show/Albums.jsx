import React from 'react'
import Album from './albums/Album'
import { v4 as uuid } from 'uuid'
import { Grid } from 'semantic-ui-react'

export default class Albums extends React.PureComponent {
  render () {
    return (
      <Grid>
        {this.props.albums.map(album => {
          return (
            <Grid.Column width={8} key={uuid()}>
              <Album album={album} />
            </Grid.Column>
          )
        })}
      </Grid>
    )
  }
}
