import React from 'react'
import { v4 as uuid } from 'uuid'

export default class Similar extends React.PureComponent {
  render () {
    return (
      <div>
        {this.props.similar.map(artist => {
          return (
            <div key={uuid()}>
              <div>name: {artist}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
