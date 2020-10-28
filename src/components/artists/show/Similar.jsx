import React from 'react'
import { v4 as uuid } from 'uuid'
import { Header, Segment } from 'semantic-ui-react'

export default class Similar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  similarList () {
    return (
      <div>
        {this.state.similar.map(artist => {
          return (
            <div key={uuid()}>
              <div>name: {artist}</div>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <React.Fragment>
        <Header as="h4" attached="top" content="Similar" />
        <Segment
          className="artistPageSegment"
          loading={!this.state.similar}
          attached="bottom"
          content={this.state.similar && this.similarList()}
        />
      </React.Fragment>
    )
  }
}
