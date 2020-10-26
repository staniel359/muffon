import React from 'react'
import Track from './tracks/Track'
import { v4 as uuid } from 'uuid'
import { List } from 'semantic-ui-react'

export default class Tracks extends React.PureComponent {
  render () {
    return (
      <List selection>
        {this.props.tracks.map(track => {
          return <Track key={uuid()} track={track} />
        })}
      </List>
    )
  }
}
