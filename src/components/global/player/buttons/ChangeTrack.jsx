import React from 'react'
import PlayerContext from 'contexts/PlayerContext'
import { Button } from 'semantic-ui-react'

export default class ChangeTrack extends React.Component {
  static contextType = PlayerContext

  constructor (props) {
    super(props)
    this.state = { loading: false, error: false }
  }

  changeTrack = () => {
    this.setState({ loading: true })

    this.context.changeTrack().then(resp => this.handleResponse(resp))
  }

  handleResponse = resp => {
    this.setState({ loading: false, error: !resp.data.track })
  }

  isDisabled () {
    return this.state.loading || this.state.error
  }

  icon () {
    return this.state.error ? 'times' : 'angle double right'
  }

  render () {
    const { children, ...rest } = this.props
    return (
      <Button
        {...rest}
        compact
        onClick={this.changeTrack}
        basic={!this.isDisabled()}
        disabled={this.isDisabled()}
        loading={this.state.loading}
        icon={this.icon()}
      />
    )
  }
}
