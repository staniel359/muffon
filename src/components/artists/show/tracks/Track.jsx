import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

export default class Track extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  listenersCount = this.props.track.listeners_count
  topTrackListenersCount = this.props.topTrackListenersCount
  trackListenersLineWidth = `${
    (this.listenersCount / this.topTrackListenersCount) * 70
  }%`

  handleClick = () => {
    this.setState({ loading: !this.state.loading })
  }

  render () {
    return (
      <List.Item>
        <List.Icon verticalAlign="middle">
          <Button
            onClick={this.handleClick}
            loading={this.state.loading}
            icon="play"
          />
        </List.Icon>

        <List.Content>
          <List.Header as="h4" content={this.props.track.title} />
          <List.Description>
            <div className="artistPageTrackCounter">
              <div
                className="inner trackLine"
                style={{ width: this.trackListenersLineWidth }}
              />
              <div className="inner">
                <Icon name="user" />
                {this.listenersCount.toLocaleString('eu')}
              </div>
            </div>
          </List.Description>
        </List.Content>
      </List.Item>
    )
  }
}
